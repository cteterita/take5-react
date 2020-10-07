import React, { useContext } from 'react';

import AuthContext from '../AuthContext';

function LandingView() {
  const auth = useContext(AuthContext);
  return (
    <section id="daily-entry">
      <h3>Take 5 minutes each day for yourself</h3>
      <p>Set your intentions in the morning</p>
      <p>Practice gratitude in the evening</p>
      <button type="submit" onClick={auth.signInWithGoogle}>
        Sign in with Google
      </button>
      <button type="submit" onClick={auth.signInAnonymously}>
        Try it Anonymously
      </button>
    </section>
  );
}

export default LandingView;
