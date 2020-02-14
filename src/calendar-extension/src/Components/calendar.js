import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import CalendarModal from './calendarModal';
import { 
  createEventRequest, 
  updateEventRequest,
  deleteEventRequest
} from '../utils/api';
import {
  payloadFormatter
} from '../utils/dataFormatter.js';
import formFactoryConfig from '../constants/formFactoryConfig.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class CalendarWrapper extends React.Component {
  state = {
    openModal: false,
    clickedEvent: {},
    isNew: false,
  }

  onEventClick = (event, isNew = false) => {
    console.log(event);
    const eventObj = {
      openModal: true,
      clickedEvent: event,
      isNew: isNew
    };

    this.setState(eventObj)
  }

  handleCloseModal = () => {
    this.setState({
      openModal: false,
      clickedEvent: {}
    })
  }

  onSubmit = (data, isNew, isDelete = false) => {
    const callBackFunc = (response) => {
      console.log("success: ", response)
      this.setState({
        openModal: false,
        clickedEvent: {}
      }, () => {
        this.props.reloadEvents()
      })
    };

    if (isDelete) {
      deleteEventRequest(data.id, this.props.authToken, callBackFunc)
    } else {
      const payload = payloadFormatter(data, formFactoryConfig);
      console.log(payload)
      if (!isNew) {
        updateEventRequest(data.id, this.props.authToken, payload, callBackFunc)
      } else {
        createEventRequest(this.props.authToken, payload, callBackFunc)
      }
    }
  }


  render() {
    const {
      openModal,
      clickedEvent,
      isNew,
    } = this.state

    return(
      <div>
        <Calendar
          selectable
          localizer={localizer}
          events={this.props.events}
          startAccessor="start"
          endAccessor="end"
          style={{height: 600, width: 600}}
          onSelectEvent={(event) => {console.log("testset", event); this.onEventClick(event)}}
          onSelectSlot={(event) => {this.onEventClick(event, true)}}
        />
        {
          openModal ? 
          <CalendarModal 
            open={openModal} 
            event={clickedEvent} 
            handleCloseModal={this.handleCloseModal}
            onSubmit={this.onSubmit}
            isNew={isNew}
          /> : null
        }
      </div>
    )
  }
}

module.exports = CalendarWrapper