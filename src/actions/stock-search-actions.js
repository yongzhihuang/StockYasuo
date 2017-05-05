import { fetchSingleStock } from '../utils/fetch-stock-util';

function searchingSingleStock(isLoading) {
  return {
    type: 'SEARCHING_SINGLE_STOCK',
    isLoading: true
  };
}

function searchSingleStockSuccess(data) {
  return {
    type: 'SEARCH_SINGLE_STOCK_SUCCESS',
    data,
    isLoading: false
  };
}

function searchSingleStockFailure(error) {
  return {
    type: 'SEARCH_SINGLE_STOCK_FAILURE',
    data: error,
    isLoading: false
  };
}

function activeSearchSymbolSet(stockSymbol) {
  return {
    type: 'ACTIVE_SEARCH_SYMBOL_SET',
    data: stockSymbol,
    isLoading: false
  }
}

export function searchSingleStock(stockSymbol) {
  return (dispatch) => {
    dispatch(searchingSingleStock(true));
    fetchSingleStock(stockSymbol)
      .then(function searchSingleStockSuccessCB(result) {
        dispatch(searchSingleStockSuccess(result));
      })
      .catch(function searchSingleStockFailureCB(error) {
        dispatch(searchSingleStockFailure(error));
      });
  }
}

export function setActiveSearchSymbol(stockSymbol) {
  return (dispatch) => {
    dispatch (activeSearchSymbolSet(stockSymbol));
  }
}
export default searchSingleStock;
