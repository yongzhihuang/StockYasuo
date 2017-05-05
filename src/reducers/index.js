import stockList from './stock-list';
import fetchLists from './fetch-lists';
import newsfeed from './newsfeed';
import search from './search';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  stockList,
  fetchLists,
  newsfeed,
  search
});

export default rootReducer;
