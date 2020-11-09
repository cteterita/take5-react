import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import LandingView from './LandingView';
import AuthContext from '../AuthContext';

const testAuth = {
  signInWithGoogle: () => {},
  signInAnonymously: () => {},
};

describe('LandingView component', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <AuthContext.Provider value={testAuth}>
        <LandingView />
      </AuthContext.Provider>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders as expected', () => {
    const tree = renderer.create(
      <AuthContext.Provider value={testAuth}>
        <LandingView />
      </AuthContext.Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
