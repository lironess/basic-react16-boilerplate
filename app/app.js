import React from 'react';
import { Provider, connect } from 'react-redux';
import store from 'store/index';

const Counter = ({ count }) => <div>{ count }</div>;
const ConnectedCounter = connect(({ count }) => ({ count }))(Counter);

export const App = () => (
  <Provider store={ store }>
    <div>
      Hello world
      <ConnectedCounter />
    </div>
  </Provider>
);
