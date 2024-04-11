import React, { useState } from 'react';
import { format, getDaysInMonth } from 'date-fns';
import { Link } from 'react-router-dom';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleMonthChange = (event) => {
    const selectedMonth = parseInt(event.target.value);
    setSelectedDate(prevDate => new Date(prevDate.getFullYear(), selectedMonth, prevDate.getDate()));
  };

  const daysInMonth = getDaysInMonth(selectedDate);
  const days = [...Array(daysInMonth).keys()].map(day => day + 1);

  return (
    <div style={{ margin: '0 auto', maxWidth: '700px' }}>
      <div>
        <label htmlFor="month" style={{ fontWeight: 'bold', marginRight: '10px' }}>Month</label>
        <select id="month" onChange={handleMonthChange} value={selectedDate.getMonth()}>
          {[...Array(12).keys()].map(month => (
            <option key={month} value={month}>{format(new Date(selectedDate.getFullYear(), month), 'MMMM')}</option>
          ))}
        </select>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {days.map(day => (
          <div key={day} style={{ border: '3px solid black', backgroundColor: '#b26ed4', width: '100px', height: '70px', margin: '5px', textAlign: 'center', cursor: 'pointer' }}>
            <Link to={`/${selectedDate.getMonth() + 1}/${day}`}>
              <p>{day}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
