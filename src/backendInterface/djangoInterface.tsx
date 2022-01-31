import { AccountDetails, Credentials } from "../util/types";
import { BackendInterface } from "./baseInterface";

const DEBUG = process.env.REACT_APP_DEBUG;

/** Backend url. */
const baseUrl = DEBUG
  ? "http://127.0.0.1:8000/"
  : "https://chbauman.pythonanywhere.com/";
console.log("Debug: ", DEBUG, baseUrl);

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

  /** Login a user with the given credentials. */
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
    const todosUrl = `${baseUrl}todo_items/`;
    const todos = await this.get(todosUrl);
    const todoJson = await todos.json();
    if (!todos.ok) {
      console.log("Failed to fetch todos", todoJson);
      return;
    }
    const todoGroupsUrl = `${baseUrl}todo_groups/`;
    const todoGroups = await this.get(todoGroupsUrl);
    const todoGroupsJson = await todoGroups.json();
    if (!todos.ok) {
      console.log("Failed to fetch groups", todoGroupsJson);
      return;
    }
    this.loadedTodos = todoJson;
    this.loadedGroups = todoGroupsJson;
    this.convertAndInit();
  }

  private async get(url: string) {
    return fetch(url, {
      method: "GET",
      headers: this.getAuthHeader(),
    });
  }

  private async post(url: string, data: any) {
    return fetch(url, {
      method: "POST",
      headers: this.getAuthHeader(),
      body: JSON.stringify(data),
    });
  }

  private getAuthHeader() {
    if (this.userData === null) {
      throw new Error("Not logged in!");
    }
    return {
      ...contTypeHeader,
      Authorization: `Token ${this.userData?.token}`,
    };
  }

  async save() {
    this.prepareSaving();
    if (this.loadedGroups === null || this.loadedTodos === null) {
      return false;
    }
    const url = `${baseUrl}todo_groups/`;
    const resp = await this.post(url, this.loadedGroups);
    const groupsUploaded = resp.ok;
    if (!groupsUploaded) {
      const respJson = await resp.json().catch((e: any) => console.log(e));
      console.log("Posting groups failed:", this.loadedGroups, respJson);
    }

    const urlItems = `${baseUrl}todo_items/`;
    const respItems = await this.post(urlItems, this.loadedTodos);
    const itemsUploaded = respItems.ok;
    if (!itemsUploaded) {
      const respJson = await respItems.json().catch((e: any) => console.log(e));
      console.log("Posting todos failed:", this.loadedTodos, respJson);
    }
    const saveSuccessful = groupsUploaded && itemsUploaded;
    if (saveSuccessful) {
      console.log("Successfully saved!");
    }
    return saveSuccessful;
  }

  async createAccountAndLogin(accoundData: AccountDetails) {
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
(window as any).djangoInterface = djangoInterface;
