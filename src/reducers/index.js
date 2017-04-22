import stockList from './stock-list';
import fetchLists from './fetch-lists';
import newsfeed from './newsfeed';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  stockList,
  fetchLists,
  newsfeed
});

export default rootReducer;
