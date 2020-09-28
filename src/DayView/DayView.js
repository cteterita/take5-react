import React, { useState } from 'react';
import DatePicker from 'react-datepicker';


import "react-datepicker/dist/react-datepicker.css";

function DayView() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <section id="date-picker">
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      </section>
      <section id="daily-entry">
      </section>
    </>
  );
}

export default DayView;
