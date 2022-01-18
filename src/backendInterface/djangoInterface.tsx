import { AccountDetailes, Credentials } from "../util/types";
import { BackendInterface } from "./baseInterface";

const DEBUG = true;
const baseUrl = DEBUG
  ? "http://127.0.0.1:8000/"
  : "https://chbauman.pythonanywhere.com/";
const contTypeHeader = {
  "Content-Type": "application/json",
};
const storageTokenId = "currUserToken";

class DjangoInterface extends BackendInterface {
  userData: {
    token: string;
    userName: string;
  } | null = null;

  constructor() {
    super();
    this.isLoggedIn();
  }

  async getPostData(url: string, requestData: any) {
    return fetch(url, {
      method: "POST",
      headers: contTypeHeader,
      body: JSON.stringify(requestData),
    });
  }

  async loginUser(credentials: Credentials) {
    const url = `${baseUrl}api-token-auth/`;
    const data = await this.getPostData(url, credentials);
    const loginSuccessful = data.ok;
    if (loginSuccessful) {
      const jsonDat = await data.json();
      const userData = { token: jsonDat.token, userName: credentials.username };
      localStorage.setItem(storageTokenId, JSON.stringify(userData));
      this.userData = userData;
      await this.loadUserData();
    }
    return loginSuccessful;
  }

  private isLoggedIn() {
    const tok = localStorage.getItem(storageTokenId);
    const isLoggedIn = tok !== null;
    if (isLoggedIn) {
      this.userData = JSON.parse(tok);
    }
    return isLoggedIn;
  }

  async loadUserData() {
    console.log("Not implementeed");
  }

  async createAccountAndLogin(accoundData: AccountDetailes) {
    const url = `${baseUrl}create_user/`;
    const data = await this.getPostData(url, accoundData);
    if (!data.ok) {
      return null;
    }
    const loginSucc = await this.loginUser(accoundData);
    if (loginSucc) {
      return accoundData.username;
    }
    return null;
  }

  logout() {
    this.userData = null;
    localStorage.removeItem(storageTokenId);
  }

  getUser() {
    if (this.isLoggedIn() && this.userData !== null) {
      return this.userData.userName;
    }
    return null;
  }
}

export const djangoInterface: BackendInterface = new DjangoInterface();
