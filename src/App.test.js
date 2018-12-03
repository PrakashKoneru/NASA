import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import proxyquire from 'proxyquire';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
const store = createStore(reducer);

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

global.matchMedia = global.matchMedia || function() {
  return {
      matches : false,
      addListener : function() {},
      removeListener: function() {}
  }
}

proxyquire.noCallThru();

const App = () => <div></div>;
const fetchImagesAction = sinon.stub();

const AppComponent = proxyquire('./App', {
  './actions.creators': { fetchImagesAction }
}).default;

describe('<App />', () => {
  let props = {
    store
  }
  it('calls render', () => {
    sinon.spy(AppComponent.prototype, 'render');
    const wrapper = shallow(<AppComponent {...props}/>);
    expect(AppComponent.prototype.render.calledOnce).to.equal(true);
  });
});
