import React from 'react';
import { Link } from 'react-router-dom';

function LandingView() {
  return (
    <section id="daily-entry">
      <h3>Take 5 minutes each day for yourself</h3>
      <p>Set your intentions in the morning</p>
      <p>Practice gratitude in the evening</p>
      <Link to="/today">
        <button type="submit">View Demo</button>
      </Link>
    </section>
  );
}

export default LandingView;
