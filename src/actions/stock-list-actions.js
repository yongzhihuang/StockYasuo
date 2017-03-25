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

export function fetchStockList(stockList) {
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

export default fetchStockList;
