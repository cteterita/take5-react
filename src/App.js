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
      .then(history.push('/today'));
  };
  const signInAnonymously = () => {
    auth.signInAnonymously()
      .then(history.push('/today'));
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
          (c) 2020 Claire Teter Lesh
          <br />
          <a href="https://github.com/cteterita/take5-react" target="_blank" rel="noopener noreferrer">Github</a>
          <br />
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScz_YgbHT38M95Zn3xu1AhHGNT93GXElDGiFQ2Qsehi3r0ygA/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">Feedback</a>
        </footer>
      </main>
    </AuthContext.Provider>
  );
}

export default App;
