import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { format, zonedTimeToUtc } from 'date-fns-tz';

import JournalEntry from '../JournalEntry/JournalEntry';
import STORE from '../store';

import 'react-datepicker/dist/react-datepicker.css';

function formatDate(date) {
  return format(date, 'yyyy-MM-dd');
}

function DayView(props) {
  // Determine date from route
  const { match, location } = props;
  let { date } = match.params;
  if (!date) {
    date = formatDate(Date.now());
  }
  const routeDate = zonedTimeToUtc(date);

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
    setJournalData(STORE[shortDate] || STORE.blank);
  }, [shortDate]);

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

  return (
    <>
      <section id="date-picker">
        <DatePicker selected={longDate} onChange={(d) => updateDate(d)} />
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

export default DayView;
