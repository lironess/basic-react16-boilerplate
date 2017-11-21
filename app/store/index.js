import { createStore, applyMiddleware, compose } from 'redux';
import { root } from 'reducers/root';

const middlewares = [];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(root, composeEnhancers(applyMiddleware(...middlewares)));

export default store;
