export default(state = [], payload) => {
  switch (payload.type) {
    case 'SEARCH_SINGLE_STOCK_SUCCESS':
      return {...state, searchResult: payload.data};
    case 'SEARCH_SINGLE_STOCK_FAILURE':
      return {...state, searchResult: null};
    case 'ACTIVE_SEARCH_SYMBOL_SET':
      return {...state, activeSearchSymbol: payload.data};
    default:
      return state;
  }
};
