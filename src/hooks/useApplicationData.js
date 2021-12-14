import React, { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState(
    {
      days: [],
      day: 'Monday',
      appointments: {},
      interviewers: {}
    }
  )

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      console.log('FIRST', all[0].data); // first
      console.log('SECOND', all[1].data); // second
      console.log('THIRD', all[2].data);

      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])


  function updateSpots(id, condition) {
    const existingState = { ...state }


    const daySpotsChange = existingState.days.find((day) => day.appointments.includes(id))

    const daySpotsIndex = existingState.days.findIndex((day) => day.id === daySpotsChange.id)

    console.log("daySpotsChange", daySpotsChange)

    console.log("daySpotsIndex", daySpotsIndex)


    if (condition === "ADD") {
      existingState.days[daySpotsIndex].spots ++
    }else {
      existingState.days[daySpotsIndex].spots --
    }
    console.log ("existingState", existingState)


    setState(prev => ({ ...prev, ...existingState}));

  }
  //updateSpots()


  //USING PROMISES 
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      // setState({ ...state, appointments: appointments })
      updateSpots(id, "REMOVE")
      setState(prev => ({ ...prev, appointments: appointments }))
      
    })

  }

  //OR ASYNC AWAIT CAN BE USED
  //
  function cancelInterview(id) {
    const updateAppointments = { ...state }

    updateAppointments.appointments[id].interview = null;

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState(updateAppointments)
      updateSpots(id, "ADD")
    })
  }





  return { state, setDay, bookInterview, cancelInterview }
}