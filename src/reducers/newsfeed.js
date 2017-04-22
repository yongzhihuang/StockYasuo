export default(state = [], payload) => {
  console.log(payload.type);
  switch (payload.type) {
    case 'FETCH_NEWS_FEED_SUCCESS':
      return {...state, newsfeed: payload.data};
    default:
      return state;
  }
};
