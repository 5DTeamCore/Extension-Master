import axios from 'axios';

const calendarEventAPIUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events'

export const getEventRequest = (authToken, timeMax, timeMin, cb) => {
  axios.get(`${calendarEventAPIUrl}?
			access_token=${authToken}&
			orderBy=starttime&
			singleEvents=true&
			timeMax=${timeMax}&
			timeMin=${timeMin}
			`
		).then(response => {
      cb(response)
		}).catch(e => {
			console.error(e)
		}) 
}

export const createEventRequest = (authToken, data, cb) => {
  axios.post(`${calendarEventAPIUrl}?access_token=${authToken}`, data)
  .then(function (response) {
    cb(response)
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const updateEventRequest = (id, authToken, data, cb) => {
  axios.patch(`${calendarEventAPIUrl}/${id}?access_token=${authToken}`, data)
  .then(function (response) {
    cb(response)
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const deleteEventRequest = (id, authToken, cb) => {
  axios.delete(`${calendarEventAPIUrl}/${id}?access_token=${authToken}`)
  .then(function (response) {
    cb(response)
  })
  .catch(function (error) {
    console.log(error);
  });
}