import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import UserInfo from './UserInfo';
import AuthContext from '../AuthContext';

const testAuthLoggedOut = {
  currentUser: null,
  signOut: () => {},
  upgradeAnonymousAccount: () => {},
};

const testAuthAnonymous = {
  currentUser: {},
  signOut: () => {},
  upgradeAnonymousAccount: () => {},
};

const testAuthGoogle = {
  currentUser: {
    email: 'example@user.com',
  },
  signOut: () => {},
  upgradeAnonymousAccount: () => {},
};

describe('LandingView component', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <AuthContext.Provider value={testAuthLoggedOut}>
        <UserInfo />
      </AuthContext.Provider>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders as expected while logged out', () => {
    const tree = renderer.create(
      <AuthContext.Provider value={testAuthLoggedOut}>
        <UserInfo />
      </AuthContext.Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders as expected while logged in anonymously', () => {
    const tree = renderer.create(
      <AuthContext.Provider value={testAuthAnonymous}>
        <UserInfo />
      </AuthContext.Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders as expected while logged in using Google', () => {
    const tree = renderer.create(
      <AuthContext.Provider value={testAuthGoogle}>
        <UserInfo />
      </AuthContext.Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
