import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const store = createStore(combineReducers(reducers), applyMiddleware(thunk))

export default store
