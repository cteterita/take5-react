import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DayView from './DayView/DayView';
import LandingView from './LandingView/LandingView';

function App() {
  return (
    <main className="App">
      <header>
        <h1>Take 5</h1>
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
  );
}

export default App;
