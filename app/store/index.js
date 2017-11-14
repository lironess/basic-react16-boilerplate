import { createStore, applyMiddleware } from 'redux';
import { root } from 'reducers/root';

const middlewares = [];

const store = createStore(root, applyMiddleware(...middlewares));

export default store;