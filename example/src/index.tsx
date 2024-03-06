import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Routers } from './routers';
import './index.scss';
/* import { initGueno } from 'test-sdk-g'; */
import { initGueno } from 'test-sdk-g';

/* window['Gueno'].initGueno({ clientKey: 'secret' }); */

initGueno({ clientKey: 'secret' });

const root = document.getElementById('root');

if (!root) throw new Error('Not Found root div');

createRoot(root).render(
  <StrictMode>
    <Routers />
  </StrictMode>,
);
