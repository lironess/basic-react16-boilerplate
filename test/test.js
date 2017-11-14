import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from '../app/app';

Enzyme.configure({ adapter: new Adapter() });

test('App should render', () => {
  const component = shallow(<App />);

  expect(component).toMatchSnapshot();
});
