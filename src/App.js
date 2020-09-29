import React from 'react';
import { Route } from 'react-router-dom';

import DayView from './DayView/DayView';

function App() {
  return (
    <main className="App">
      <header>
        <h1>Take 5</h1>
      </header>
      { /* Routes Here */ }
      <Route exact path="/today" component={DayView} />
      <footer>
        (c) 2020 Claire Teter Lesh - About - Send Feedback
      </footer>
    </main>
  );
}

export default App;
