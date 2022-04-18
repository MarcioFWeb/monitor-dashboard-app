import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise';

import authReducer from '../Reducers/authReducer'

const reducers = combineReducers(
  {
    auth: authReducer
  }
)

export default function storeConfig() {

  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = applyMiddleware(promiseMiddleware)(createStore)(reducers,devTools)
  return store
}