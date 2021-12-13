# Scheduler project breakdown

## Components

- Button
- DayList
- DayListItem
- InterviewerList
- InterviewerListItem
- Appointment
- Appointment/Header
- Appointment/Empty
- Appointment/Show
- Appointment/Form
- Appointment/Status
- Appointment/Error
- Appointment/Confirm

### Button

- State:
- Props:{
  name:String the name of the day
  spots:Number the number of spots remaining
  selected:Boolean true or false declaring that this day is selected
  setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
}
- Used by:

### DayList

- State:
- Props:{
  days:Array an array of objects (each object represents a day and includes an id, name, and spots)
  day:String the currently selected day
  setDay:Function sets the currently selected day and accepts the name of the day eg. "Monday", "Tuesday"
}
- Used by:

### DayListItem

- State:
- Props:{
  name:String the name of the day
  spots:Number the number of spots remaining
  selected:Boolean true or false declaring that this day is selected
  setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
}
- Used by:

### InterviewerList

- State:
- Props:{
  id:number - the id of the interviewer
  name:string - the name of the interviewer
  avatar:url - a url to an image of the interviewer
  selected:boolean 
  setInterviewer:function

}

- Used by:

### InterviewerListItem

- State:
- Props: {
  interviewers:array - an array of objects as seen above
  setInterviewer:function - a function that accepts an interviewer id. This function will simply be passed down to the InterviewerListItem
  interviewer:number - a number that represents the id of the currently selected interviewer  
  }
- Used by:

### Appointment

- State:
- Props:
- Used by:

### Appointment/Header

- State:
- Props:
- Used by:

### Appointment/Empty

- State:
- Props:
- Used by:

### Appointment/Show

- State:
- Props: {
  student:String eg. "Lydia Miller-Jones"
  interviewer:Object we can use the interview object that already exists in stories/index.js for this
  onEdit:Function to be called when the user clicks the Edit button
  onDelete:Function to be called when the user clicks the Delete button
}
- Used by:

### Appointment/Form

- State:{
  student:String
  interviewer:Number
}
- Props:{
  student:String
  interviewers:Array
  interviewer:Number
  onSave:Function
  onCancel:Function
}

- Used by:

### Appointment/Status

- State:
- Props:{
  message:String eg. "Deleting"
}
- Used by:

### Appointment/Error

- State:
- Props:
message:String eg. "Could not delete appointment."
onClose:Function to be called when the user clicks the Close button
- Used by:

### Appointment/Confirm

- State:
- Props:{
  message:String eg. "Delete the appointment?"
  onConfirm:Function to be called when the user clicks the Confirm button
  onCancel:Function to be called when the user clicks the Cancel button
}
- Used by: