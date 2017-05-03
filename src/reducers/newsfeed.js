import { flattenDeep } from 'lodash';

export default(state = [], payload) => {
  switch (payload.type) {
    case 'FETCH_NEWS_FEED_SUCCESS':
      if (payload.filterBySingle) {

        return {...state, newsfeed: payload.data[0].news};
      }
      return {...state, newsfeed: constructDigestFeed(payload.data)};
    case 'FETCH_NEWS_FEED_FAILURE':
      return {...state, newsfeed: []};
    default:
      return state;
  }
};

function constructDigestFeed(newsfeedList) {
  // returns an array with first 2 items of each entry
  const digestFeed = [];
  newsfeedList.forEach((item) => {
    digestFeed.push(item.news.splice(0,2));
  });

  return flattenDeep(digestFeed);
}
