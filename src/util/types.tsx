export interface Credentials {
  password: string;
  username: string;
}

export interface AccountDetails extends Credentials {
  lastname?: string;
  email: string;
}
