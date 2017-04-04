import stockList from './stock-list';
import fetchLists from './fetch-lists';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  stockList,
  fetchLists
});

export default rootReducer;
