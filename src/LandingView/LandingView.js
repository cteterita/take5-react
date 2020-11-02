import React, { useContext } from 'react';

import AuthContext from '../AuthContext';

function LandingView() {
  const auth = useContext(AuthContext);
  return (
    <section id="daily-entry">
      <h3>Take 5 minutes each day for yourself</h3>
      <p>Take the first 2.5 minutes after waking up to set your intentions for the day.</p>
      <p>Return in the evening for 2.5 minutes to review your day and practice gratitude.</p>
      <div id="sign-in-holder">
        <button type="submit" onClick={auth.signInWithGoogle}>
          Sign in with Google
        </button>
        &nbsp;or&nbsp;
        <button type="submit" onClick={auth.signInAnonymously}>
          Try it Anonymously
        </button>
      </div>
    </section>
  );
}

export default LandingView;
