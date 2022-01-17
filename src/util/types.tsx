export interface Credentials {
  password: string;
  username: string;
}

export interface AccountDetailes extends Credentials {
  lastname?: string;
  email: string;
}
