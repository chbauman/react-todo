import { AccountDetailes, Credentials } from "../util/types";

export abstract class BackendInterface {
  abstract loginUser(credentials: Credentials): Promise<boolean>;
  abstract getUser(): string | null;

  /** Creates a user account.
   *
   * Returns null if creation was not successful.
   */
  abstract createAccountAndLogin(
    accoundData: AccountDetailes
  ): Promise<string | null>;
}
