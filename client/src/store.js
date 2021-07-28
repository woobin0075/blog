import {createStore, compose, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'

import createRootReducer from './redux/reducers/index'
import rootSaga from './redux/sagas'

export const history = createBrowserHistory()

const sagaMddleware = createSagaMiddleware()

const initalState = {}

const middlewares = [sagaMddleware, routerMiddleware(history)]

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeEnhancer = process.env.NODE_ENV === "production" ? compose : devtools || compose

const store = createStore(
    createRootReducer(history),
    initalState,
    composeEnhancer(applyMiddleware(...middlewares))
)

sagaMddleware.run(rootSaga)

export default store