import { AccountDetails, Credentials } from "../util/types";

export type BackendTodo = {
  created: string;
  text: string;
  id: number;
  done: null | string;
  parent_group_name: string;
};
export type BackendTodoGroup = {
  created: string;
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

  /** Creates a user account.
   *
   * Returns null if creation was not successful.
   */
  abstract createAccountAndLogin(
    accoundData: AccountDetails
  ): Promise<string | null>;
}
