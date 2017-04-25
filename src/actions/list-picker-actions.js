function fetchListSuccess(list) {
  return {
    type: 'FETCH_LIST_SUCCESS',
    data: list,
    isLoading: false
  };
}

export function addList(listName) {
  return (dispatch) => {
    let currentList = localStorage.list;
    currentList = currentList.split(',');
    currentList.push(listName)
    localStorage.list = currentList;
    dispatch(fetchListSuccess(localStorage.list));
  }
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
