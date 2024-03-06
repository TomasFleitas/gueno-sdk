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

  public setClientKey(clientKey: string) {
    this.clientKey = clientKey;
  }

  public getClientKey() {
    return this.clientKey;
  }
}
