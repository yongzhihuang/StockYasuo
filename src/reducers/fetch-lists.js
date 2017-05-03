export default(state = [], payload) => {
  switch (payload.type) {
    case 'FETCH_LIST_SUCCESS':
      return {...state, lists: payload.data};
    case 'SET_ACTIVE_LIST':
      return {...state, activeList: payload.data};
    default:
      return state;
  }
};
