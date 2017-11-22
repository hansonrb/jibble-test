import React from 'react';
import { Route } from 'react-router';

import Collections from './components/';

const routes = (
  <div id="collections-app">
    <Route path="/" component={Collections} />
  </div>
);

export default routes;
