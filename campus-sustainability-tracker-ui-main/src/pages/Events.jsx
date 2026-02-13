import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import styles from '../styles/Events.module.css';

function formatEventDate(dateStr) {
  // dateStr is in MM-DD-YYYY
  const [month, day, year] = dateStr.split('-');
  const date = new Date(`${year}-${month}-${day}`);
  const dayNum = date.getDate();
  const monthName = date.toLocaleString('default', { month: 'long' });
  const yearNum = date.getFullYear();
  // Get ordinal suffix
  const j = dayNum % 10, k = dayNum % 100;
  let suffix = 'th';
  if (j === 1 && k !== 11) suffix = 'st';
  else if (j === 2 && k !== 12) suffix = 'nd';
  else if (j === 3 && k !== 13) suffix = 'rd';
  return `${dayNum}${suffix} ${monthName} ${yearNum}`;
}



function groupEventsByMonthYear(events) {
  // Returns { 'January 2025': [event, ...], ... }
  return events.reduce((acc, event) => {
    const [monthStr, , yearStr] = event.date.split('-');
    const month = parseInt(monthStr, 10) - 1; // JS months are 0-based
    const year = parseInt(yearStr, 10);
    const date = new Date(year, month, 1);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(event);
    return acc;
  }, {});
}


function parseEventData(rawData) {
  // rawData: string with tab-separated date and name per line
  return rawData.trim().split('\n').map((line, idx) => {
    const [date, ...nameParts] = line.split('\t');
    return {
      id: idx + 1,
      date: date.trim(),
      name: nameParts.join(' ').trim(),
    };
  });
}






function Events() {
  const { events, loading, error } = useEventContext();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Parse event date to Date object for comparison
  const eventsWithDateObj = (events || []).map(ev => {
    const [month, day, year] = ev.date.split('-');
    return { ...ev, dateObj: new Date(parseInt(year,10), parseInt(month,10)-1, parseInt(day,10)) };
  });

  const today = new Date();
  today.setHours(0,0,0,0); // Ignore time for comparison

  const upcomingEvents = eventsWithDateObj.filter(ev => ev.dateObj >= today);
  const pastEvents = eventsWithDateObj.filter(ev => ev.dateObj < today);

  const groupedUpcoming = groupEventsByMonthYear(upcomingEvents);
  const groupedPast = groupEventsByMonthYear(pastEvents);

  return (
    <>
      <h2 className={styles.eventsTitle}><span role="img" aria-label="calendar" style={{marginRight: '0.5rem'}}>&#128197;</span>Events</h2>
      <div className={styles.tabsBar}>
        <button
          className={activeTab === 'upcoming' ? `${styles.tabBtn} ${styles.active}` : styles.tabBtn}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Events
        </button>
        <button
          className={activeTab === 'past' ? `${styles.tabBtn} ${styles.active}` : styles.tabBtn}
          onClick={() => setActiveTab('past')}
        >
          Past Events
        </button>
      </div>
      {loading ? (
        <div className={styles.loading}>Loading events...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <>
          {activeTab === 'upcoming' && (
            <ul className={styles.eventListScrollable}>
              {upcomingEvents.length === 0 ? (
                <li className={styles.noEvents}>No upcoming events.</li>
              ) : (
                Object.entries(groupedUpcoming).flatMap(([monthYear, monthEvents]) => [
                  <li key={monthYear} className={styles.eventMonthHeading}>{monthYear}</li>,
                  ...monthEvents.map(event => (
                    <li key={event.id} className={styles.eventItem}>
                      <span className={styles.eventName}>{event.name}</span>
                      <span className={styles.eventDate}>{formatEventDate(event.date)}</span>
                    </li>
                  ))
                ])
              )}
            </ul>
          )}
          {activeTab === 'past' && (
            <ul className={styles.eventListScrollable}>
              {pastEvents.length === 0 ? (
                <li className={styles.noEvents}>No past events.</li>
              ) : (
                Object.entries(groupedPast).flatMap(([monthYear, monthEvents]) => [
                  <li key={monthYear} className={styles.eventMonthHeading}>{monthYear}</li>,
                  ...monthEvents.map(event => (
                    <li key={event.id} className={styles.eventItem}>
                      <span className={styles.eventName}>{event.name}</span>
                      <span className={styles.eventDate}>{formatEventDate(event.date)}</span>
                    </li>
                  ))
                ])
              )}
            </ul>
          )}
        </>
      )}
    </>
  );
}

export default Events;
