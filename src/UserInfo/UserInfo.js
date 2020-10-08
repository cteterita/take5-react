import React, { useContext } from 'react';
import AuthContext from '../AuthContext';
import './UserInfo.css';

function UserInfo() {
  const auth = useContext(AuthContext);
  if (!auth.currentUser) {
    return null;
  }
  return (
    <div className="user-info-holder">
      <span>
        Logged in as:
        <br />
        {auth.currentUser.email || 'Anonymous'}
      </span>
      <button type="button" onClick={auth.signOut}>Log out</button>
      <button type="button" onClick={auth.upgradeAnonymousAccount} hidden={!auth.currentUser.isAnonymous}>Sign in with Google</button>
    </div>
  );
}

export default UserInfo;
