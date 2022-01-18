import { AccountDetails, Credentials } from "../util/types";

export abstract class BackendInterface {
  abstract loginUser(credentials: Credentials): Promise<boolean>;

  /** Returns the currently logged-in user, if any. */
  abstract getUser(): string | null;
  abstract logout(): void;

  /** Creates a user account.
   *
   * Returns null if creation was not successful.
   */
  abstract createAccountAndLogin(
    accoundData: AccountDetails
  ): Promise<string | null>;
}
