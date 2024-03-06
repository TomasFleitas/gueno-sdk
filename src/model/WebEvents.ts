import {
  BACKEND_URL,
  SEND_SNAPSHOT_TIME_SECONDS,
  TRIGGER_ON_EVENTS,
} from '../utils';
import { WebAuthentication } from './WebAuthentication';
import { WebSession } from './WebSession';

const URL = `${BACKEND_URL}/gather`;

export class WebEvents {
  private static instance: WebEvents;
  private gatheredData: TGatheredData = { browserInformation: {} };

  private webSession = WebSession.getInstance();
  private webAuthentication = WebAuthentication.getInstance();
  private initAt = new Date();
  private eventsStarted = {
    click: false,
    navigate: false,
    timeOnApp: false,
    location: false,
  };

  private constructor() {
    this.initInterval();
  }

  public static getInstance(): WebEvents {
    if (!WebEvents.instance) {
      WebEvents.instance = new WebEvents();
    }
    return WebEvents.instance;
  }

  public initGelocation() {
    if (this.eventsStarted.location) {
      return this;
    }
    this.eventsStarted.location = true;
    if ('geolocation' in navigator) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          const handlePermissionGranted = () => {
            navigator.geolocation.getCurrentPosition(
              ({ coords: { latitude, longitude } }) => {
                this.gatheredData.location = [latitude, longitude];
              },
              (error) => {
                console.error(`Error getting location: ${error.message}`);
              },
              { enableHighAccuracy: true },
            );

            navigator.geolocation.watchPosition(
              ({ coords: { latitude, longitude } }) => {
                this.gatheredData.location = [latitude, longitude];
              },
              (error) => {
                console.error(`Error watching location: ${error.message}`);
              },
              { enableHighAccuracy: true, timeout: 5000 },
            );
          };

          switch (permissionStatus.state) {
            case 'granted':
              handlePermissionGranted();
              break;
            case 'prompt':
              handlePermissionGranted();
              break;
            case 'denied':
              break;
          }

          permissionStatus.onchange = () => {
            if (permissionStatus.state === 'granted') {
              handlePermissionGranted();
            } else if (permissionStatus.state === 'denied') {
            }
          };
        });
    } else {
      console.error('Geolocation is not supported by your browser');
    }

    return this;
  }

  public initClicks() {
    if (this.eventsStarted.click) {
      return this;
    }
    this.eventsStarted.click = true;
    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementType = target.tagName;
      const id = target.id;
      const title = target.title;
      const className = target.className;
      const name = (target as HTMLInputElement).name;
      const value = (target as HTMLInputElement).value;

      const data = {
        className,
        elementType,
        id,
        name,
        title,
        value,
      };

      if (!this.gatheredData.clicks?.length) {
        this.gatheredData.clicks = [data];
      } else {
        this.gatheredData.clicks.push(data);
      }
    });
    return this;
  }

  public initTimeOnApp() {
    if (this.eventsStarted.timeOnApp) {
      return this;
    }
    this.eventsStarted.timeOnApp = true;
    window.addEventListener('beforeunload', () => {
      const clientKey = this.webAuthentication.getClientKey();

      if (!clientKey) {
        console.error('Secret Key no provided');
        return;
      }

      const endAt = new Date();
      navigator.sendBeacon(
        URL,
        JSON.stringify({
          ...this.gatheredData,
          timeOnApp: endAt.getTime() - this.initAt.getTime(),
          'session-id': this.webSession.getSessionId(),
          'secret-key': clientKey,
        }),
      );
    });
    return this;
  }

  public initUserAgent() {
    const userAgent = navigator.userAgent;

    let name: TBrowserInformatino['name'];
    let version: string | undefined;
    let platform: TBrowserInformatino['platform'];
    let osType: TBrowserInformatino['osType'];

    if (userAgent.match(/chrome|chromium|crios/i)) {
      name = 'Chrome';
    } else if (userAgent.match(/firefox|fxios/i)) {
      name = 'Firefox';
    } else if (userAgent.match(/safari/i)) {
      name = 'Safari';
    } else if (userAgent.match(/opr\//i)) {
      name = 'Opera';
    } else if (userAgent.match(/edg/i)) {
      name = 'Edge';
    } else {
      name = 'Unknown';
    }

    if (name === 'Firefox') {
      version = userAgent.match(/firefox\/([0-9.]+)/i)?.[1];
    } else if (name === 'Safari') {
      version = userAgent.match(/version\/([0-9.]+)/i)?.[1];
    } else if (name === 'Opera') {
      version = userAgent.match(/opr\/([0-9.]+)/i)?.[1];
    } else if (name === 'Edge') {
      version = userAgent.match(/edg\/([0-9.]+)/i)?.[1];
    }

    if (/Mobi|Android/i.test(userAgent)) {
      platform = 'Mobile';
    } else if (/iPad|Tablet/i.test(userAgent)) {
      platform = 'Tablet';
    } else {
      platform = 'Desktop';
    }

    if (/Android/i.test(userAgent)) {
      osType = 'Android';
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      osType = 'iOS';
    } else {
      osType = 'Other';
    }

    this.gatheredData.browserInformation = {
      name,
      osType,
      platform,
      version,
    };

    return this;
  }

  public initNavigation() {
    if (this.eventsStarted.navigate) {
      return this;
    }
    this.eventsStarted.navigate = true;

    const pushState = history.pushState;
    const replaceState = history.replaceState;

    history.pushState = function () {
      pushState.apply(history, arguments);
      window.dispatchEvent(new Event('pushstate'));
      window.dispatchEvent(new Event('locationchange'));
    };

    history.replaceState = function () {
      replaceState.apply(history, arguments);
      window.dispatchEvent(new Event('replacestate'));
      window.dispatchEvent(new Event('locationchange'));
    };

    window.addEventListener('popstate', () => {
      window.dispatchEvent(new Event('locationchange'));
    });

    window.addEventListener('locationchange', () => {
      if (!this.gatheredData.navigations?.length) {
        this.gatheredData.navigations = [window.location.href];
      } else {
        this.gatheredData.navigations.push(window.location.href);
      }

      this.sendAfterEvent('Navigate');
    });
    return this;
  }

  private initInterval() {
    setInterval(() => {
      this.sendShanpshot('Timeout');
    }, SEND_SNAPSHOT_TIME_SECONDS * 1000);
  }

  private sendShanpshot(eventType: TEvents) {
    const clientKey = this.webAuthentication.getClientKey();

    if (!clientKey) {
      console.error('Client Key no provided');
      return;
    }

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'session-id': this.webSession.getSessionId(),
        'secret-key': clientKey,
      },
      body: JSON.stringify({ eventType, ...this.gatheredData }),
    }).catch(console.error);

    this.cleanDataAfterSend();
  }

  private sendAfterEvent(eventType: TEvents) {
    if (TRIGGER_ON_EVENTS.includes(eventType)) {
      this.sendShanpshot(eventType);
    }
  }

  private cleanDataAfterSend() {
    this.gatheredData.clicks = [];
  }
}
