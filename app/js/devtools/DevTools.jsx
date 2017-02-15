import React from 'react';
import { createDevTools } from 'redux-devtools'; // eslint-disable-line import/no-extraneous-dependencies
import LogMonitor from 'redux-devtools-log-monitor'; // eslint-disable-line import/no-extraneous-dependencies

const DevTools = createDevTools(
  <LogMonitor theme='tomorrow' />,
);
export default DevTools;
