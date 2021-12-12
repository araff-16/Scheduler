
export function getAppointmentsForDay(state, day) {
  // let arrayOfApps= Object.values(state)

  let apptsArray = []

  for(let dayObj of state.days) {
    if (dayObj.name === day){
      apptsArray = [...dayObj.appointments]
      break;
    }
  }

  let apptsToReturn = []

  for(let apptId of apptsArray) {
    //apptsToReturn.push({...state.appointments[apptId]})

    apptsToReturn = [...apptsToReturn, {...state.appointments[apptId]}]
  }

  return apptsToReturn;
}


export function getInterview(state, interview) {

  if (interview){
    const result = {...interview, interviewer:{...state.interviewers[interview.interviewer]}}
    return result
  } else{
    return null
  }
  
}

export function getInterviewersForDay(state, day) {

  let interviewersArray = []

  for(let dayObj of state.days) {
    if (dayObj.name === day){
      interviewersArray = [...dayObj.interviewers]
      break;
    }
  }

  let interviewersToReturn = []

  for(let interviewerId of interviewersArray) {
    //apptsToReturn.push({...state.appointments[apptId]})

    interviewersToReturn = [...interviewersToReturn, {...state.interviewers[interviewerId]}]
  }

  return interviewersToReturn;

}