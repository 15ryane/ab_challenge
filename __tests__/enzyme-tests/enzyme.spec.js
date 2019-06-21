import * as React from 'react';
import { configure, shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

import App from "App.jsx"

describe('React unit tests', () => {
  describe('App', () => {

    beforeAll(() => {
      wrapper = shallow(<App />);
    });

    it('should render', () => {
      expect(wrapper).toBeTruthy();
    });
  });

});