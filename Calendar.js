import React, { useState } from "react";
import dayjs from "dayjs";
import events from "./events.json";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day(); // Sunday = 0
  const daysInMonth = currentDate.daysInMonth();

  const handlePrev = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNext = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const generateDays = () => {
    const days = [];
    for (let d = 1; d <= daysInMonth; d++) {
  const dateStr = currentDate.date(d).format("YYYY-MM-DD");
  const dayEvents = events.filter((event) => event.date === dateStr);
  const isToday = dayjs().isSame(currentDate.date(d), "day");

  days.push(
    <div key={d} className={'day ${isToday ? "today" : ""}'}>
      <strong>{d}</strong>
      {dayEvents.map((event, index) => (
        <div key={index} className="event">
          {event.title}
        </div>
      ))}
    </div>
  );
}

    // Empty boxes before the first day
    for (let i = 0; i < startDay; i++) {
      days.push(
      <div key={d} className={'day ${isToday ? "today" :""}'}>
        {d}
      </div>);
    }

    // Days of the month
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = dayjs().isSame(currentDate.date(d), "day");

      days.push(
        <div key={d} className={'day ${isToday ? "today" : ""}'}>
          {d}
         </div>
      );
    }

    return days;
  };

  return (
    <div>
      <div className="controls">
        <button onClick={handlePrev}>Previous</button>
        <span>{currentDate.format("MMMM YYYY")}</span>
        <button onClick={handleNext}>Next</button>
      </div>
      <div className="calendar">{generateDays()}</div>
    </div>
  );
};

export default Calendar;