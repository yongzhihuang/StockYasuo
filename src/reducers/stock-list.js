export default(state = [], payload) => {
  switch (payload.type) {
    case 'FETCH_STOCK_LIST_SUCCESS':
      return {...state, stockList: payload.data};
    case 'FETCH_STOCK_LIST_FAILURE':
      return [...state, payload.stockList]
    default:
      return state;
  }
};
