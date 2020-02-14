/* global chrome */

import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Components/calendar';
import common from 'extension-common';

import test from './test';
import { getEventRequest } from './utils/api';

class App extends React.Component<Props> {
	state = {
		authToken: '',
		events: []
	}

	auth = () => {
		chrome.identity.getAuthToken({interactive: true}, (token) => {
			this.setState({
				authToken: token
			})
			this.getCalendar()
		})
	}

	getTime = (year) => {
		const date = new Date()
		date.setYear(date.getFullYear() + year)
		return date.toISOString();
	}

	getCalendar = () => {
		const timeMax = this.getTime(1)
		const timeMin = this.getTime(-1)
		getEventRequest(this.state.authToken, timeMax, timeMin, (response) => {
			this.setState({
				events: this.createEvents(response.data.items)
			})
		})
	}

	createEvents = (events) => {
		return events.map((event) => {
			return {
				start: new Date(event.start.dateTime),
				end: new Date(event.end.dateTime),
				title: event.summary,
				eventData: event,
			}
		})
	}

	testingPurpose = () => {
		this.setState({
			events: this.createEvents(test.items)
		})
	}

	reloadEvents = () => {
		this.getCalendar()
	}

	componentDidMount = () => {
		if (process.env.NODE_ENV === 'development') {
			this.testingPurpose();
		} else {
			this.auth()
		}
	}

	render() {
		return (
      <Calendar
				events={this.state.events}
				authToken={this.state.authToken}
				reloadEvents={this.reloadEvents}
			/>
		)
	}
}

const dom = document.getElementById('App')
if (dom === null) {
	//Error
	console.error("dom does not exist")
} else {
	ReactDOM.render(<App />, dom);
}
