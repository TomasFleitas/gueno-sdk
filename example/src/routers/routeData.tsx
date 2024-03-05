import { Home, Page1, Page2, Page3 } from 'pages';

export const ROUTE = {
  home: '/',
  page1: '/page1',
  page2: '/page2',
  page3: '/page3',
};

export const ROUTES_DATA = [
  {
    path: ROUTE.home,
    component: <Home />,
  },
  {
    path: ROUTE.page1,
    component: <Page1 />,
  },
  {
    path: ROUTE.page2,
    component: <Page2 />,
  },
  {
    path: ROUTE.page3,
    component: <Page3 />,
  },
];
