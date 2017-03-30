import React from 'react';
import { Router, Route , IndexRoute } from 'react-router';

import App from './App';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import StockListPage from './pages/StockList/StockListPage';

const Routes = (props) => (
 <Router {...props}>
   <Route path="/" component={App}>
      <IndexRoute component={StockListPage} />
      <Route path="*" component={NotFoundPage} />
   </Route>
 </Router>
);
export default Routes;
