import React from 'react';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';

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

Counter.propTypes = {
  count: PropTypes.number
};

Counter.defaultProps = {
  count: 0
};
