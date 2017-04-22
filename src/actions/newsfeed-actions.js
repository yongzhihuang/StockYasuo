import fetchSingleNewsfeedUtil from '../utils/fetch-newsfeed-util';

function fetchingNewsfeed(isLoading) {
  return {
    type: 'FETCHING_NEWS_FEED',
    isLoading: true
  };
}

function fetchNewsfeedSuccess(data) {
  return {
    type: 'FETCH_NEWS_FEED_SUCCESS',
    data,
    isLoading: false
  };
}

function fetchNewsfeedFailure(error) {
  return {
    type: 'FETCH_NEWS_FEED_FAILURE',
    data: error,
    isLoading: false
  };
}

export function fetchNewsfeed(symbol) {
  const stockList = fetchStockSymbols().sort();
  return (dispatch) => {
    dispatch(fetchingNewsfeed(true));
    fetchSingleNewsfeedUtil(stockList)
      .then(function fetchNewsfeedSuccessCallback(result) {
        dispatch(fetchNewsfeedSuccess(result));
      })
      .catch(function fetchNewsfeedFailureCallback(error) {
        dispatch(fetchNewsfeedFailure(error));
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


export default fetchNewsfeed;
