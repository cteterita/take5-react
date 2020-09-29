import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';

import JournalEntry from '../JournalEntry/JournalEntry';
import STORE from '../store.js';

import "react-datepicker/dist/react-datepicker.css";

function formatDate(date) {
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  date = new Date(date - timezoneOffset);
  return date.toISOString().split('T')[0];
}

function DayView() {
  const [startDate, setStartDate] = useState(new Date());
  const [journalData, setJournalData] = useState({});
  const [entriesComplete, setEntriesComplete] = useState(0);

  // Fetch this day's journal entries
  useEffect(() => {
    console.log(formatDate(startDate));
    setJournalData(STORE[formatDate(startDate)] || STORE['blank']);
  }, [startDate]);

  // Determine if either of today's entries have already been saved
  useEffect(() => {
    if(!journalData.morning) {
      setEntriesComplete(0);
    } else {
      setEntriesComplete([journalData.morning.complete, journalData.evening.complete].filter(Boolean).length);
    }
  }, [journalData]);

  const saveEntry = (type, prompts) => {
    STORE[formatDate(startDate)] = STORE[formatDate(startDate)] || {...STORE.blank};
    STORE[formatDate(startDate)][type] = {
      complete: true,
      prompts: prompts,
    }
    setEntriesComplete(entriesComplete + 1);
    setJournalData(STORE[formatDate(startDate)]);
  };

  const deleteDay = () => {
    STORE[formatDate(startDate)] = {...STORE.blank};
    setJournalData(STORE[formatDate(startDate)]);
    setEntriesComplete(0);
  }

  return (
    <>
      <section id="date-picker">
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      </section>
      <section id="daily-entry">
        <JournalEntry entryData={journalData.morning} type='morning' saveEntry={saveEntry} />
        <hr />
        <JournalEntry entryData={journalData.evening} type='evening' saveEntry={saveEntry} />
        <hr />
        {
          entriesComplete ?
          <button type="submit" className="delete-button" onClick={deleteDay}>Delete all entries from this day</button> :
          ''
        }
      </section>
    </>
  );
}

export default DayView;
