export class WebAuthentication {
  private static instance: WebAuthentication;
  private secretKey: string;

  private constructor() {}

  public static getInstance(): WebAuthentication {
    if (!WebAuthentication.instance) {
      WebAuthentication.instance = new WebAuthentication();
    }
    return WebAuthentication.instance;
  }

  public setSecretKey(secretKey: string) {
    this.secretKey = secretKey;
  }

  public getSecretKey() {
    return this.secretKey;
  }
}
