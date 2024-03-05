import { WebEvents } from './model/WebEvents';
import { WebAuthentication } from './model/WebAuthentication';

const webAuthentication = WebAuthentication.getInstance();

export const initGueno = ({ secretKey }: TInitGueno) => {
  webAuthentication.setSecretKey(secretKey);
};

(() => {
  const webEvents = WebEvents.getInstance();
  // init events
  webEvents
    .initGelocation()
    .initTimeOnApp()
    .initClicks()
    .initNavigation()
    .initUserAgent();
})();

// Define global variable to initGueno in CDN mode
(window as any)['Gueno'] = {
  initGueno,
};