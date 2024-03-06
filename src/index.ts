import { WebEvents } from './model/WebEvents';
import { WebAuthentication } from './model/WebAuthentication';

const webAuthentication = WebAuthentication.getInstance();

export const initGueno = ({ clientKey }: TInitGueno) => {
  webAuthentication.setClientKey(clientKey);
};

// The idea of this autocalleable function is add more logic or another things encapsulating the scope
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
