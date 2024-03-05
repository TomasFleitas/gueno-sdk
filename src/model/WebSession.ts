import { TTLStorage } from '../services/Storage';
import { SESSION_ID_KEY, SESSION_TTL_SECONDS } from '../utils';

export class WebSession {
  private static instance: WebSession;

  private constructor() {}

  public static getInstance(): WebSession {
    if (!WebSession.instance) {
      WebSession.instance = new WebSession();
    }
    return WebSession.instance;
  }

  getSessionId() {
    let savedSessionId = TTLStorage.getItem(SESSION_ID_KEY);

    if (!savedSessionId) {
      savedSessionId = crypto.randomUUID();
      TTLStorage.setItem(SESSION_ID_KEY, savedSessionId, SESSION_TTL_SECONDS);
    }

    return savedSessionId;
  }
}
