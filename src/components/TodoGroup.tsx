import { v4 as uuidv4 } from "uuid";

type TodoType = "todo" | "group";

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

const isGroup = (gt: GeneralTodo): gt is TodoGroup => {
  return gt.type === "group";
};

export type TodoTree = { [key: string]: GeneralTodo };

export type TodoAndGroups = { todo: Todo; groupList: TodoGroup[] };
type TodoListifiedTree = {
  [key: string]: TodoAndGroups;
};

export class TodoHandler {
  todoTree: TodoTree;
  root: TodoGroup;

  onChangedCbDict: { [key: string]: VoidFunction } = {};

  constructor() {
    // Generate root todo group.
    const rootId = this.generateNewId();
    const rootGroup: TodoGroup = {
      name: "root",
      type: "group",
      parentId: null,
      id: rootId,
      childrenIds: [],
      createdAt: null,
    };
    this.todoTree = {};
    this.todoTree[rootId] = rootGroup;
    this.root = rootGroup;
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

  generateNewId() {
    return uuidv4();
  }

  addGroup(name: string, parentGroupId: string | null = null) {
    const newGroup: TodoGroup = {
      ...this.getNewBase(parentGroupId),
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
      ...this.getNewBase(parentGroupId),
      text: text,
      done: null,
      type: "todo",
    };

    this.todoTree[newTodo.id] = newTodo;
    this.changeHappened();
    return newTodo.id;
  }

  private getNewBase(parentGroupId: string | null) {
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

  getTodoList() {
    const extTree: TodoListifiedTree = {};
    const currGroupList: TodoGroup[] = [];
    this.getTodoListHelper(extTree, currGroupList, this.root);
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

// Add some test data
globalTodoHandler.addTodo("test");
globalTodoHandler.addTodo("test2");
const textGroupId = globalTodoHandler.addGroup("testGroup");
globalTodoHandler.addTodo("test group", textGroupId);
globalTodoHandler.addTodo("test2 group", textGroupId);
