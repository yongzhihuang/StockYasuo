import { filter } from 'lodash';
import fetchStockUtil from '../utils/fetch-stock-util';

function fetchingStockList(isLoading) {
  return {
    type: 'FETCHINGS_STOCK_LIST',
    isLoading: true
  };
}

function fetchStockListSuccess(data) {
  return {
    type: 'FETCH_STOCK_LIST_SUCCESS',
    data,
    isLoading: false
  };
}

function fetchStockListFailure(error) {
  return {
    type: 'FETCH_STOCK_LIST_FAILURE',
    data: error,
    isLoading: false
  };
}

export function fetchStockList(listName) {

  const stockList = fetchStockSymbols(listName).sort();
  return (dispatch) => {
    dispatch(fetchingStockList(true));
    fetchStockUtil(stockList)
      .then(function fetchStockSuccess(result) {
        dispatch(fetchStockListSuccess(result));
      })
      .catch(function fetchStockFailure(error) {
        dispatch(fetchStockListFailure(error));
      });
  }
}

function fetchStockSymbols(listName) {
  const currentStocks = localStorage[listName];
  if (!currentStocks) {
    return [];
  }
  return currentStocks.split(',');
}

export function addStockSymbolToList(stock, listName) {
  return (dispatch) => {
    let currentStocks = localStorage[listName];
    if (stock) {
      if (!currentStocks) {
        const stockList = [];
        stockList.push(stock);
        localStorage[listName] = stockList;
      } else {
        currentStocks = currentStocks.split(',');
        currentStocks.push(stock);
        localStorage[listName] = currentStocks.join(',');
      }
      dispatch(fetchStockList(listName));
    }
  }
}

export function removeStockSymbolFromList(symbol, listName) {
  return (dispatch) => {
    let currentStocks = localStorage[listName];
    if (currentStocks && symbol) {
      currentStocks = currentStocks.split(',');
      const updatedStockList = filter(currentStocks, stockSymbol => stockSymbol !== symbol);
      localStorage[listName] = updatedStockList.join(',');
      dispatch(fetchStockList(listName));
    }
  }
}
export default fetchStockList;
