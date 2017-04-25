import fetchSingleNewsfeedUtil from '../utils/fetch-newsfeed-util';

function fetchingNewsfeed(isLoading) {
  return {
    type: 'FETCHING_NEWS_FEED',
    isLoading: true
  };
}

function fetchNewsfeedSuccess(data, filterBySingle) {
  return {
    type: 'FETCH_NEWS_FEED_SUCCESS',
    data,
    filterBySingle,
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

export function fetchNewsfeed(symbols, filterBySingle) {
  const stockList = symbols.sort();
  return (dispatch) => {
    dispatch(fetchingNewsfeed(true));
    fetchSingleNewsfeedUtil(stockList)
      .then(function fetchNewsfeedSuccessCallback(result) {
        dispatch(fetchNewsfeedSuccess(result, filterBySingle));
      })
      .catch(function fetchNewsfeedFailureCallback(error) {
        dispatch(fetchNewsfeedFailure(error));
      });
  }
}


export default fetchNewsfeed;
