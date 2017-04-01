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

export function fetchStockList() {
  const stockList = fetchStockSymbols().sort();
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

function fetchStockSymbols() {
  const currentStocks = localStorage.stockList;
  if (!currentStocks) {
    return [];
  }
  return currentStocks.split(',');
}

export function addStockSymbolToList(stock) {
  return (dispatch) => {
    let currentStocks = localStorage.stockList;
    if (stock) {
      if (!currentStocks) {
        const stockList = [];
        stockList.push(stock);
        localStorage.stockList = stockList;
      } else {
        currentStocks = currentStocks.split(',');
        currentStocks.push(stock);
        localStorage.stockList = currentStocks.join(',');
      }
      dispatch(fetchStockList());
    }
  }
}

export function removeStockSymbolFromList(symbol) {
  return (dispatch) => {
    let currentStocks = localStorage.stockList;
    if (currentStocks && symbol) {
      currentStocks = currentStocks.split(',');
      const updatedStockList = filter(currentStocks, stockSymbol => stockSymbol !== symbol);
      localStorage.stockList = updatedStockList.join(',');
      dispatch(fetchStockList());
    }
  }
}
export default fetchStockList;
