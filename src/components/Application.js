import React, {useState, useEffect} from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

import axios from "axios";

import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors.js";


export default function Application(props) {

  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState('Monday');

  const [state,setState] = useState(
    {
      days:[],
      day: 'Monday',
      appointments: {},
      interviewers: {}
    }
  ) 

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({...prev, days }));

  const dailyAppointments = getAppointmentsForDay(state,state.day);
  const dailyInterviewers = getInterviewersForDay(state,state.day)

  useEffect(()=> {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      console.log('FIRST', all[0].data); // first
      console.log('SECOND', all[1].data); // second
      console.log('THIRD', all[2].data);

      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  } ,[])

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({ ...state, appointments:appointments})
  }
 

  const parsedAppointments = dailyAppointments.map((appointment) => {
    
    const interview = getInterview(state, appointment.interview);

    return (
    <Appointment  
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers= {dailyInterviewers} 
      bookInterview ={bookInterview}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"> 
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {parsedAppointments}
      </section>
    </main>
  );
}
