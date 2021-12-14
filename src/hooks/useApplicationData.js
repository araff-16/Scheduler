import React, {useState, useEffect} from "react";

import axios from "axios";

export default function useApplicationData() {

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

    return axios.put(`/api/appointments/${id}`, {interview})
    .then (() => setState({ ...state, appointments:appointments}))
     
  }
    
  //OR ASYNC AWAIT CAN BE USED
  //
  async function cancelInterview(id){
    const updateAppointments = {...state}

    updateAppointments.appointments[id].interview = null;

    await axios.delete(`/api/appointments/${id}`)
    setState(updateAppointments)
  }
  
  return {state, setDay, bookInterview, cancelInterview}
}