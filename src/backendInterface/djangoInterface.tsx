import { AccountDetailes, Credentials } from "../util/types";
import { BackendInterface } from "./baseInterface";

const DEBUG = false;
const baseUrl = DEBUG
  ? "http://127.0.0.1:8000/"
  : "https://chbauman.pythonanywhere.com/";
const contTypeHeader = {
  "Content-Type": "application/json",
};

class DjangoInterface extends BackendInterface {
  async getPostData(url: string, requestData: any) {
    return await fetch(url, {
      method: "POST",
      headers: contTypeHeader,
      body: JSON.stringify(requestData),
    });
  }

  async loginUser(credentials: Credentials) {
    const url = `${baseUrl}api-token-auth/`;
    const data = await this.getPostData(url, credentials);
    return data.ok;
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

  getUser() {
    return null;
  }
}

export const djangoInterface: BackendInterface = new DjangoInterface();
