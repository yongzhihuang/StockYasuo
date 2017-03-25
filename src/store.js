import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from  './reducers';

export default(initialState) => {
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore, initialState);
  return createStoreWithMiddleware(rootReducer);
}
