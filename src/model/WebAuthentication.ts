export class WebAuthentication {
  private static instance: WebAuthentication;
  private clientKey: string;

  private constructor() {}

  public static getInstance(): WebAuthentication {
    if (!WebAuthentication.instance) {
      WebAuthentication.instance = new WebAuthentication();
    }
    return WebAuthentication.instance;
  }

  public setSecretKey(clientKey: string) {
    this.clientKey = clientKey;
  }

  public getSecretKey() {
    return this.clientKey;
  }
}
