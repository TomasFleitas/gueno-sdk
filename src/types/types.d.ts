type TClickData = {
  elementType: string;
  id: string;
  title: string;
  className: string;
  name: string;
  value: string;
};

type TNavigationState = {};

type TBrowserInformatino = {
  name?: 'Chrome' | 'Firefox' | 'Safari' | 'Opera' | 'Edge' | 'Unknown';
  version?: string;
  platform?: string;
  osType?: 'Android' | 'iOS' | 'Other';
};

type TGatheredData = {
  location?: number[];
  eventType?: TEvents;
  clicks?: TClickData[];
  timeOnApp?: string;
  navigations?: TNavigationState[];
  browserInformation: TBrowserInformatino;
};

type TEvents = 'Click' | 'Navigate' | 'Close' | 'Reload' | 'Timeout';

type TInitGueno = {
  clientKey: string;
};
