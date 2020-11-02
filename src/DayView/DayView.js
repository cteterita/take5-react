import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import addDays from 'date-fns/addDays';

import AuthContext from '../AuthContext';
import JournalEntry from '../JournalEntry/JournalEntry';
import config from '../config';

import 'react-datepicker/dist/react-datepicker.css';

function formatDate(date) {
  return format(date, 'yyyy-MM-dd');
}

function DayView(props) {
  // Determine date from route
  const { match, history } = props;
  let { date } = match.params; // TODO: Deal with invalid dates
  if (!date) {
    date = formatDate(Date.now());
  }
  const routeDate = zonedTimeToUtc(date);

  // Access AuthContext
  const auth = useContext(AuthContext);

  // Set up our state vars
  const [shortDate, setShortDate] = useState(formatDate(routeDate));
  const [longDate, setLongDate] = useState(routeDate);
  const [journalData, setJournalData] = useState({});
  const [entriesComplete, setEntriesComplete] = useState(0);
  const [userAuthToken, setuserAuthToken] = useState(0);

  const updateDate = (newDate) => {
    const formattedDate = formatDate(newDate);
    history.push(`/${formattedDate}`);
    setLongDate(newDate);
    setShortDate(formattedDate);
  };

  // Set the user's authToken for API requests
  useEffect(() => {
    if (auth.currentUser) {
      auth.currentUser.getIdToken(true)
        .then((token) => setuserAuthToken(token));
    } else {
      setuserAuthToken(null);
    }
  }, [auth.currentUser, history]);

  // Fetch this day's journal entries
  useEffect(() => {
    if (userAuthToken) {
      fetch(`${config.SERVER_URL}/entries/${shortDate}`, {
        headers: {
          authToken: userAuthToken,
        },
      })
        .then((res) => res.json())
        .then((parsedRes) => setJournalData(parsedRes))
        .catch(); // TODO: implement error handling
    }
  }, [shortDate, userAuthToken]);

  // Determine if either of today's entries have already been saved
  useEffect(() => {
    if (!journalData.morning) {
      setEntriesComplete(0);
    } else {
      const { morning, evening } = journalData;
      const countComplete = [morning.complete, evening.complete].filter(Boolean).length;
      setEntriesComplete(countComplete);
    }
  }, [journalData]);

  // Update the user feedback to show if entry saved successfully
  const displaySuccessMessage = (type, successful) => {
    const message = successful ? 'Saved successfully!' : 'Error saving. Please try again.';
    const feedbackDiv = document.getElementsByClassName(`${type} user-feedback`)[0];
    feedbackDiv.removeAttribute('hidden');
    feedbackDiv.innerHTML = message;
    if (!successful) {
      feedbackDiv.classList.add('error');
    } else {
      feedbackDiv.classList.remove('error');
    }
  };

  const saveEntry = (type, prompts) => {
    if (userAuthToken) {
      const body = {
        type,
        prompts,
      };
      fetch(`${config.SERVER_URL}/entries/${shortDate}`, {
        method: 'POST',
        headers: {
          authToken: userAuthToken,
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(() => {
          const newJournalData = { ...journalData };
          newJournalData[type] = {
            prompts,
            complete: true,
          };
          setJournalData(newJournalData);
          setEntriesComplete(entriesComplete + 1);
          displaySuccessMessage(type, true);
        })
        .catch(() => displaySuccessMessage(type, false));
    }
  };

  const deleteDay = () => {
    if (userAuthToken) {
      fetch(`${config.SERVER_URL}/entries/${shortDate}`, {
        method: 'delete',
        headers: {
          authToken: userAuthToken,
        },
      })
        .then((res) => res.json())
        .then((parsedRes) => setJournalData(parsedRes));
    }
  };

  const incrementDay = (n) => {
    updateDate(addDays(longDate, n));
  };

  return (
    <>
      <section id="date-picker">
        <button type="submit" onClick={() => incrementDay(-1)}>&larr;</button>
        <DatePicker selected={longDate} onChange={(d) => updateDate(d)} />
        <button type="submit" onClick={() => incrementDay(1)}>&rarr;</button>
      </section>
      <section id="daily-entry">
        <div id="daily-entry-holder">
          <JournalEntry entryData={journalData.morning} type="morning" saveEntry={saveEntry} />
          <hr />
          <JournalEntry entryData={journalData.evening} type="evening" saveEntry={saveEntry} />
        </div>
        {
          entriesComplete
            ? <button type="submit" className="delete-button" onClick={deleteDay}>Delete all entries from this day</button>
            : ''
        }
      </section>
    </>
  );
}

DayView.propTypes = {
  match: PropTypes.shape({
    params: {
      date: PropTypes.string.isRequired,
    }.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default DayView;
