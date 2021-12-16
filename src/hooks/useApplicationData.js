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
      
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])



  function newUpdateSpots(id, passedappointments){
    //finds the specific day object that includes the appointmnet id
  const dayObjectFromListOfDays = state.days.find((day) => day.appointments.includes(id))
  
  //Indexof the day object will be its id subtract 1
  const indexOfFoundDay = dayObjectFromListOfDays.id-1

  //list of appointments inside the day object
  const listOfAppointments = dayObjectFromListOfDays.appointments

  //Gathers list of appoinments that are null
  const listOfEmptyAppointments = listOfAppointments.filter((appId) => !passedappointments[appId].interview)

  const newSpots = listOfEmptyAppointments.length

  //We need to create a new day object that will not change the orinal
  const updatedDay = {...state.days[indexOfFoundDay], spots:newSpots}

  //We need to create a new list of day objects that will not change the original
  const updatedDays = [...state.days]
  updatedDays[indexOfFoundDay] = updatedDay

  return updatedDays

  }

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

    const daysWithSpotsUpdate = newUpdateSpots(id, appointments)
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      // setState({ ...state, appointments: appointments })
      //updateSpots(id, "REMOVE")
      setState(prev => ({ ...prev, appointments: appointments, days:daysWithSpotsUpdate}))
      
    })

  }

  function cancelInterview(id) {
    const newappt = { ...state.appointments[id] }

    newappt.interview = null;
  
    const newappts = {...state.appointments, [id]:newappt}
    
    const daysWithSpotsUpdate =newUpdateSpots(id, newappts)
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState(prev => ({...prev, appointments:{...prev.appointments, [id]:newappt}, days:daysWithSpotsUpdate }))
      //updateSpots(id, "ADD")
    })
  }





  return { state, setDay, bookInterview, cancelInterview }
}