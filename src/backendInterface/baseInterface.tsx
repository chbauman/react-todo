import {
  getNewId,
  globalTodoHandler,
  Todo,
  TodoGroup,
  TodoTree,
} from "../components/TodoGroup";
import { AccountDetails, Credentials } from "../util/types";

export type BackendTodo = {
  created: Date;
  text: string;
  id: number;
  done: null | Date;
  parent_group_name: string;
};
export type BackendTodoGroup = {
  created: Date;
  name: string;
  parent_id: string;
};

export abstract class BackendInterface {
  loadedTodos: null | BackendTodo[] = null;
  loadedGroups: null | BackendTodoGroup[] = null;

  /** Login user.
   *
   * If successcul, the user data shall be loaded using loadUserData().
   */
  abstract loginUser(credentials: Credentials): Promise<boolean>;

  /** Returns the currently logged-in user, if any. */
  abstract getUser(): string | null;
  abstract logout(): void;

  /** Loads the data and populates the fields loadedTodos and loadedGroups. */
  abstract loadUserData(): Promise<void>;

  convertAndInit() {
    if (this.loadedTodos === null || this.loadedGroups === null) {
      console.log("Fuck");
      return;
    }
    // Mapping from group names to groups
    const groupMap: { [key: string]: TodoGroup } = {};

    const retTree: TodoTree = {};

    // Initialize groups without children or parents
    this.loadedGroups.forEach((el) => {
      const id = getNewId();
      const convertedGroup: TodoGroup = {
        createdAt: el.created,
        name: el.name,
        type: "group",
        id,
        childrenIds: [],
        parentId: null,
      };
      groupMap[el.name] = convertedGroup;
      retTree[id] = convertedGroup;
    });

    // Convert todo items and populate group children list
    this.loadedTodos.forEach((el) => {
      const parGroup = groupMap[el.parent_group_name];
      const id = getNewId();
      parGroup.childrenIds.push(id);
      const child: Todo = {
        parentId: parGroup.id,
        id,
        type: "todo",
        text: el.text,
        createdAt: el.created,
        done: el.done,
      };
      retTree[id] = child;
    });

    // Populate parent id / children relationship for groups
    this.loadedGroups.forEach((el) => {
      if (el.parent_id) {
        const parGroup = groupMap[el.parent_id];
        const self = groupMap[el.name];
        self.parentId = parGroup.id;
        parGroup.childrenIds.push(self.id);
      }
    });

    const root = groupMap["root"];
    globalTodoHandler.init(retTree, root);
  }

  /** Creates a user account.
   *
   * Returns null if creation was not successful.
   */
  abstract createAccountAndLogin(
    accoundData: AccountDetails
  ): Promise<string | null>;
}
