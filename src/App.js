import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import firebase from './firebase';
import AuthContext from './AuthContext';
import DayView from './DayView/DayView';
import LandingView from './LandingView/LandingView';
import UserInfo from './UserInfo/UserInfo';

function App() {
  const [currentUser, setCurrentUser] = useState();
  const history = useHistory();

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider)
      .then((updatedUserAuth) => {
        // sets currentUser manually; onAuthStateChanged is too slow
        setCurrentUser(updatedUserAuth.user);
        history.push('/today');
      });
  };
  const signInAnonymously = () => {
    alert('You can try the app and save entries for the duration of your session. If you decide to save them for later, you can upgrade your account by signing into Google later.');
    auth.signInAnonymously()
      .then((updatedUserAuth) => {
        setCurrentUser(updatedUserAuth.user);
        history.push('/today');
      });
  };
  const upgradeAnonymousAccount = () => {
    auth.currentUser.linkWithPopup(provider)
      .then((usercred) => {
        const { user } = usercred;
        console.log('Anonymous account successfully upgraded', user); // TODO: user feedback
      }).catch((error) => {
        console.log('Error upgrading anonymous account', error);
      });
  };
  const signOut = () => {
    auth.signOut()
      .then(history.push('/'));
  };

  useEffect(() => {
    auth.onAuthStateChanged((updatedUserAuth) => {
      setCurrentUser(updatedUserAuth);
      // If no user is logged in, redirect them to the home page to login
      if (!updatedUserAuth) {
        history.push('/');
      }
    });
  });

  const contextValue = {
    currentUser,
    signInWithGoogle,
    signInAnonymously,
    signOut,
    upgradeAnonymousAccount,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <main className="App">
        <header>
          <h1>Take 5</h1>
          <UserInfo />
        </header>
        { /* Routes Here */ }
        <Switch>
          <Route path="/today" component={DayView} />
          <Route path="/:date(\d{4}-\d{2}-\d{2})" component={DayView} />
          <Route path="/" component={LandingView} />
        </Switch>
        <footer>
          Copyright 2020,&nbsp;
          <a href="https://github.com/cteterita/take5-react" target="_blank" rel="noopener noreferrer">Claire Teter Lesh</a>
        </footer>
      </main>
    </AuthContext.Provider>
  );
}

export default App;
