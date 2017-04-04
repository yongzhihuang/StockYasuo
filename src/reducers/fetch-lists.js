export default(state = [], payload) => {
  switch (payload.type) {
    case 'FETCH_LIST_SUCCESS':
      return {...state, lists: payload.data};
    default:
      return state;
  }
};
