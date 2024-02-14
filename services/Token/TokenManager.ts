class TokenManager {
  private token: string;

  constructor() {
    this.token = '';
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getToken() {
    return this.token;
  }
}

const tokenManager = new TokenManager();
export default tokenManager;
