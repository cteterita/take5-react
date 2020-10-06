import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import addDays from 'date-fns/addDays';

import AuthContext from '../AuthContext';
import JournalEntry from '../JournalEntry/JournalEntry';
import config from '../config';
import STORE from '../store';

import 'react-datepicker/dist/react-datepicker.css';

function formatDate(date) {
  return format(date, 'yyyy-MM-dd');
}

function DayView(props) {
  // Determine date from route
  const { match } = props;
  let { date } = match.params; // TODO: Deal with invalid dates
  if (!date) {
    date = formatDate(Date.now());
  }
  const routeDate = zonedTimeToUtc(date);

  const auth = useContext(AuthContext);
  const [shortDate, setShortDate] = useState(formatDate(routeDate));
  const [longDate, setLongDate] = useState(routeDate);
  const [journalData, setJournalData] = useState({});
  const [entriesComplete, setEntriesComplete] = useState(0);

  const updateDate = (newDate) => {
    const formattedDate = formatDate(newDate);
    props.history.push(`/${formattedDate}`);
    setLongDate(newDate);
    setShortDate(formattedDate);
  };

  // Fetch this day's journal entries
  useEffect(() => {
    if (auth.currentUser) {
      auth.currentUser.getIdToken(true)
        .then((token) => {
          fetch(`${config.SERVER_URL}/entries/${shortDate}`, {
            headers: {
              authToken: token,
            },
          })
            .then((res) => res.json())
            .then((parsedRes) => setJournalData(parsedRes))
            .catch((e) => console.log(e)); // TODO: implement error handling
        });
    }
  }, [shortDate, auth.currentUser]);

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

  const saveEntry = (type, prompts) => {
    STORE[shortDate] = STORE[shortDate] || { ...STORE.blank };
    STORE[shortDate][type] = {
      complete: true,
      prompts,
    };
    setEntriesComplete(entriesComplete + 1);
    setJournalData(STORE[shortDate]);
  };

  const deleteDay = () => {
    STORE[shortDate] = { ...STORE.blank };
    setJournalData(STORE[shortDate]);
    setEntriesComplete(0);
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
        <JournalEntry entryData={journalData.morning} type="morning" saveEntry={saveEntry} />
        <hr />
        <JournalEntry entryData={journalData.evening} type="evening" saveEntry={saveEntry} />
        <hr />
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
