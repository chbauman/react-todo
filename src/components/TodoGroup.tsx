import { v4 as uuidv4 } from "uuid";

type TodoType = "todo" | "group";

/** Base todo interface.
 *
 * The id is a UUID that is generated when the object is created.
 */
interface TodoBase {
  id: string;
  parentId: string | null;
  type: TodoType;
  createdAt: Date | null;
}

export interface Todo extends TodoBase {
  type: "todo";
  text: string;
  done: Date | null;
  createdAt: Date;
}

export interface TodoGroup extends TodoBase {
  type: "group";
  name: string;
  childrenIds: string[];
}

export type GeneralTodo = TodoGroup | Todo;

export const getNewId = () => {
  return uuidv4();
};

export const isGroup = (gt: GeneralTodo): gt is TodoGroup => {
  return gt.type === "group";
};

export type TodoTree = { [key: string]: GeneralTodo };

export type TodoGroupAndGroups = { todo: TodoGroup; groupList: TodoGroup[] };
export type TodoAndGroups = { todo: Todo; groupList: TodoGroup[] };
type TodoListifiedTree = {
  [key: string]: TodoAndGroups;
};

export class TodoHandler {
  todoTree!: TodoTree;
  root!: TodoGroup;
  subTreeRoot!: TodoGroupAndGroups;

  onChangedCbDict: { [key: string]: VoidFunction } = {};
  initialized = false;

  constructor() {
    // Generate root todo group.
    this.init({});
  }

  init(todoTree: TodoTree, root?: TodoGroup) {
    if (root === undefined) {
      const rootId = this.generateNewId();
      const rootGroup: TodoGroup = {
        name: "root",
        type: "group",
        parentId: null,
        id: rootId,
        childrenIds: [],
        createdAt: new Date(),
      };
      this.todoTree = {};
      this.todoTree[rootId] = rootGroup;
      this.root = rootGroup;
      this.subTreeRoot = { groupList: [], todo: rootGroup };
    } else {
      this.todoTree = todoTree;
      this.subTreeRoot = { groupList: [], todo: root };
      this.root = root;
    }
  }

  setGroupAsSelected(newGroup: TodoGroupAndGroups) {
    this.subTreeRoot = newGroup;
  }

  registerOnChanged(key: string, cb: VoidFunction) {
    this.onChangedCbDict[key] = cb;
  }

  private changeHappened() {
    Object.keys(this.onChangedCbDict).forEach((key) => {
      this.onChangedCbDict[key]();
    });
  }

  getAllGroups() {
    const todos = Object.keys(this.todoTree).map((key) => this.todoTree[key]);
    return todos.filter(isGroup);
  }

  setToDone(id: string) {
    const todo = this.todoTree[id];
    if (isGroup(todo)) {
      throw new Error("This is a bug, cannot set a group to DONE");
    }
    todo.done = new Date();
    this.changeHappened();
  }

  changeItemGroup(id: string, newGroupId: string | null) {
    const todo = this.todoTree[id];

    // Fix parent child relation
    const prevGroup = this.getParent(todo.parentId);
    prevGroup.childrenIds = prevGroup.childrenIds.filter(
      (childId) => id !== childId
    );

    const newParent = this.getParent(newGroupId);
    newParent.childrenIds.push(id);

    todo.parentId = newGroupId;
    this.changeHappened();
  }

  generateNewId() {
    return getNewId();
  }

  addGroup(name: string, parentGroupId: string | null = null) {
    const newGroup: TodoGroup = {
      ...this.getNewBaseObject(parentGroupId),
      name: name,
      type: "group",
      childrenIds: [],
    };
    this.todoTree[newGroup.id] = newGroup;
    this.changeHappened();
    return newGroup.id;
  }

  addTodo(text: string, parentGroupId: string | null = null) {
    const newTodo: Todo = {
      ...this.getNewBaseObject(parentGroupId),
      text: text,
      done: null,
      type: "todo",
    };

    this.todoTree[newTodo.id] = newTodo;
    this.changeHappened();
    return newTodo.id;
  }

  private getNewBaseObject(parentGroupId: string | null) {
    const parent = this.getParent(parentGroupId);
    const newTodo = {
      id: this.generateNewId(),
      parentId: parent.id,
      createdAt: new Date(),
    };
    parent.childrenIds.push(newTodo.id);
    return newTodo;
  }

  private getParent(parentGroupId: string | null) {
    const parId = parentGroupId === null ? this.root.id : parentGroupId;
    const parent = this.todoTree[parId];
    if (!isGroup(parent)) {
      throw new Error("Parent is not a group!!");
    }
    return parent;
  }

  deleteTodo(id: string) {
    const todoToDelete = this.todoTree[id];

    // Delete recursively if it is a group
    if (isGroup(todoToDelete)) {
      todoToDelete.childrenIds.forEach((el) => {
        this.deleteTodo(el);
      });
    }

    // Delete from parent's children
    const parent = this.getParent(todoToDelete.parentId);
    parent.childrenIds = parent.childrenIds.filter((el) => el !== id);

    // Do the actual delete
    delete this.todoTree[id];
    this.changeHappened();
  }

  getGroupList() {
    const groups: TodoGroup[] = [this.root];
    const currGroup = this.root;
    this.getGroupListHelper(groups, currGroup);
    return groups;
  }

  private getGroupListHelper(groups: TodoGroup[], currGroup: TodoGroup) {
    for (const childId of currGroup.childrenIds) {
      const todo = this.todoTree[childId];
      if (isGroup(todo)) {
        groups.push(todo);
        this.getGroupListHelper(groups, todo);
      }
    }
  }

  getTodoList() {
    const extTree: TodoListifiedTree = {};
    const currGroupList: TodoGroup[] = [];

    this.getTodoListHelper(extTree, currGroupList, this.subTreeRoot.todo);
    return extTree;
  }

  private getTodoListHelper(
    extTree: TodoListifiedTree,
    currGroupList: TodoGroup[],
    currTodo: GeneralTodo
  ) {
    if (isGroup(currTodo)) {
      const newList = [...currGroupList, currTodo];
      for (const childTodoId of currTodo.childrenIds) {
        const childTodo = this.todoTree[childTodoId];
        this.getTodoListHelper(extTree, newList, childTodo);
      }
    } else {
      extTree[currTodo.id] = { todo: currTodo, groupList: currGroupList };
    }
  }
}

export const globalTodoHandler = new TodoHandler();
