window.addEventListener('load', async () => {events = await fetchEvents();eventColors = await fetchEventColors();currentDate = new Date();updateCalendar(currentDate);});
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
const isPastDate = (year, month, day) => new Date(year, month, day) < new Date();
const isToday = (year, month, day) => new Date(year, month, day).toDateString() === new Date().toDateString();
function createCalendar(events, daysInMonth, year, month) {
  const calendarContainer = document.createElement('div');
  calendarContainer.className = 'calendar-container';
  ['日', '月', '火', '水', '木', '金', '土'].forEach(weekday => {
    const calendarWeekday = document.createElement('div');
    calendarWeekday.className = 'calendar-weekday';
    calendarWeekday.textContent = weekday;
    calendarContainer.appendChild(calendarWeekday);
  });
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const eventKeys = Object.keys(events);
  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day empty';
    calendarContainer.appendChild(emptyDay);
  }
  let i = 1;
  while (i <= daysInMonth) {
    const calendarDay = document.createElement('div');
    calendarDay.className = 'calendar-day';
    calendarDay.setAttribute('data-day', i);
    calendarDay.innerHTML = `<span>${i}</span>`;
    if (isToday(year, month, i)) {
      calendarDay.classList.add('today');
      calendarDay.classList.add('vibrate');
    }    
    if (isPastDate(year, month, i)) calendarDay.classList.add('past');
    const eventKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
    if (eventKeys.includes(eventKey)) {
      calendarDay.classList.add(`event-day-${events[eventKey]}`);
    }
    calendarContainer.appendChild(calendarDay);
    i++;
  }
  return calendarContainer;
}
function setCalendarMonthYear(year, month) {
  const calendarMonthYear = document.getElementById('calendar-month-year');
  if (calendarMonthYear) {
    const yearMultiplier = 12;
    const totalMonths = (year) * yearMultiplier + month + 1;
    calendarMonthYear.innerHTML = '';
    calendarMonthYear.textContent = totalMonths;
  }
}
window.addEventListener('load', async () => {
  events = await fetchEvents();
  currentDate = new Date();
  updateCalendar(currentDate);
  const previousMonthButton = document.getElementById('previous-month');
  if (previousMonthButton) {
    previousMonthButton.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      updateCalendar(currentDate);
    });
  }
  const nextMonthButton = document.getElementById('next-month');
  if (nextMonthButton) {
    nextMonthButton.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      updateCalendar(currentDate);
    });
  }
});
async function updateCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  setCalendarMonthYear(year, month);
  const events = await fetchEvents();
  const calendar = createCalendar(events, daysInMonth, year, month);
  const calendarWrapper = document.getElementById('calendar');
  if (calendarWrapper) {
    calendarWrapper.innerHTML = '';
    calendarWrapper.appendChild(calendar);
    updateEventColors(events, year, month);
  }
}
function darkenColor(color, ratio) {
  const colorInt = parseInt(color.replace('#', ''), 16);
  const r = (colorInt >> 16) & 255;
  const g = (colorInt >> 8) & 255;
  const b = colorInt & 255;
  const newR = Math.round(Math.max(0, r * (1 - ratio)));
  const newG = Math.round(Math.max(0, g * (1 - ratio)));
  const newB = Math.round(Math.max(0, b * (1 - ratio)));
  const newColorInt = (newR << 16) | (newG << 8) | newB;
  return `#${newColorInt.toString(16).padStart(6, '0')}`;
}
function findEvent(events, year, month, day) {
  return events.find(event => {
    const eventDate = new Date(`${event.date}T00:00:00.000Z`);
    const offset = eventDate.getTimezoneOffset() * 60000;
    const adjustedEventDate = new Date(eventDate.getTime() + offset);
    return adjustedEventDate.getFullYear() === year && adjustedEventDate.getMonth() === month && adjustedEventDate.getDate() === day;
  }) || null;
}
async function fetchEvents() {
  try {
    const response = await fetch('https://xalsier.github.io/nak_snapshot/events.csv');
    const data = await response.text();
    const lines = data.split('\n');
    const events = {};
    for (let i = 6; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;
      const [date, eventType] = line.split(',');
      events[date] = parseInt(eventType, 10);
    }
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}
async function fetchEventColors() {
  try {
    const response = await fetch('https://xalsier.github.io/nak_snapshot/events.csv');
    const data = await response.text();
    const lines = data.split('\n');
    const eventColors = {};
    for (let i = 1; i < 5; i++) {
      const line = lines[i];
      const [eventType, background, color] = line.split(',');
      eventColors[eventType] = { background, color };
    }
    return eventColors;
  } catch (error) {
    console.error('Error fetching event colors:', error);
    return {};
  }
}
async function updateEventColors(events, year, month) {
  console.log('Updating event colors');
  const eventKeys = Object.keys(events);
  const eventColors = await fetchEventColors();
  const calendarDays = document.querySelectorAll('.calendar-day');
  const eventDays = Array.from(calendarDays).filter(day => {
    const eventDayClass = Array.from(day.classList).find(cls => cls.startsWith('event-day-'));
    return eventDayClass !== undefined;
  });
  eventDays.forEach(eventDay => {
    const day = parseInt(eventDay.getAttribute('data-day'), 10);
    eventDay.style.backgroundColor = '';
    const eventKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    if (eventKeys.includes(eventKey)) {
      const eventType = events[eventKey];
      const eventColor = eventColors[eventType];
      if (eventColor) {
        if (isPastDate(year, month, day)) {
          // Apply past event colors
          eventDay.style.backgroundColor = darkenColor(eventColor.background, 0.8);
          eventDay.style.color = eventColor.background;
        } else {
          // Apply normal event colors
          eventDay.style.backgroundColor = eventColor.background;
          eventDay.style.color = eventColor.color;
        }
      }
    }
    if (isToday(year, month, day)) {
      // Remove the darkened effect for "today" with an event
      eventDay.style.backgroundColor = eventColors[events[eventKey]].background;
      eventDay.style.color = eventColors[events[eventKey]].color;
    }
  });
}
const initialDate = new Date();
updateCalendar(initialDate);