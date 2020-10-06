import React from 'react';

const AuthContext = React.createContext({
  currentUser: null,
  signInWithGoogle: null,
  signOut: null,
});

export default AuthContext;
