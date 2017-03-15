export default(state = [], payload) => {
  switch (payload.type) {
    case 'FETCH_STOCK_LIST_SUCCESS':
      return [...state, payload.stockList];
    default:
      return state;
  }
};
