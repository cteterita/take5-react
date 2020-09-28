import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';

import JournalEntry from '../JournalEntry/JournalEntry';
import STORE from '../store.js';

import "react-datepicker/dist/react-datepicker.css";

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function DayView() {
  const [startDate, setStartDate] = useState(new Date());
  const [journalData, setJournalData] = useState({});
  const [entryStarted, setEntryStarted] = useState(false);

  // Fetch this day's journal entries
  useEffect(() => {
    setJournalData(STORE[formatDate(startDate)] || STORE['blank']);
  }, [startDate]);

  // Determine if either of today's entries have already been saved
  useEffect(() => {
    if(!journalData.morning) {
      setEntryStarted(false);
    } else {
      setEntryStarted(journalData.morning.complete || journalData.evening.complete);
    }
  }, [journalData]);

  return (
    <>
      <section id="date-picker">
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      </section>
      <section id="daily-entry">
        <JournalEntry entryData={journalData.morning} type='morning' />
        <hr />
        <JournalEntry entryData={journalData.evening} type='evening'/>
        <hr />
        {
          entryStarted ?
          <button type="submit" className="delete-button">Delete all entries from this day</button> :
          ''
        }
      </section>
    </>
  );
}

export default DayView;
