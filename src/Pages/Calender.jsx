import React, { useEffect, useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Paper, Stack, useTheme } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import "../Styles/Calender.css";

export default function DemoApp() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }
  function handleDateSelect(selectInfo) {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      const newEvent = {
        id: uuidv4(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      calendarApi.addEvent(newEvent);
    }
  }
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      const parsed = JSON.parse(storedEvents);
      console.log("Events loaded from localStorage: ", parsed);
      setCurrentEvents(parsed);
    }
  }, []);
  function handleEventClick(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  function handleEvents(events) {
    const plainEvents = events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      allDay: event.allDay,
    }));

    const currentString = JSON.stringify(currentEvents);
    const newString = JSON.stringify(plainEvents);

    if (currentString !== newString) {
      setCurrentEvents(plainEvents);
      localStorage.setItem("events", newString);
    }
  }

  return (
    <div
      className="demo-app"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Sidebar
        // @ts-ignore
        handleWeekendsToggle={handleWeekendsToggle}
        currentEvents={currentEvents}
      />
      <div className="demo-app-main" style={{ width: "90%" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          events={currentEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function Sidebar({ currentEvents }) {
  const theme = useTheme();
  return (
    <Stack
      className="demo-app-sidebar"
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      {/* <Box className='demo-app-sidebar-section'>
        <label >
          <input
            style={{ marginRight: '10px' }}
            type='checkbox'
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          ></input>
          toggle weekends
        </label>
      </Box> */}
      <Paper
        className="demo-app-sidebar-section"
        sx={{
          textAlign: "center",
          px: 2,
          m: 2,
          minHeight: "200px",
          boxShadow:
            theme.palette.mode === "light"
              ? "0 2px 4px rgba(0, 0, 0, 0.2)"
              : "0 4px 10px rgba(255, 245, 245, 0.45)",
        }}
      >
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </Paper>
    </Stack>
  );
}

function SidebarEvent({ event }) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
