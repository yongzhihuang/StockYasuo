function fetchListSuccess(list) {
  return {
    type: 'FETCH_LIST_SUCCESS',
    data: list,
    isLoading: false
  };
}

export function getLists() {
  let list = localStorage.list;
  return (dispatch) => {
    if (!list) {
      list = ['owned'];
      localStorage.list = list;
    } else {
      list = list.split(',');
    }
    dispatch(fetchListSuccess(list));
  }
}

export default getLists;
