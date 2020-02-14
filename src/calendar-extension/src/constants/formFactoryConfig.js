import {
  TEXT,
  DATE,
  TEXTAREA,
  CHIP
} from './form';

export default [
  {
    label: 'Summary',
    keyVal: 'summary',
    payloadPath: 'summary',
    valPath: 'summary',
    type: TEXT
  },
  {
    label: "Attendees",
    keyVal: 'attendees',
    payloadPath: 'attendees',
    type: CHIP
  },
  {
    label: 'Start',
    keyVal: 'start',
    payloadPath: 'start.dateTime',
    type: DATE
  },
  {
    label: 'End',
    keyVal: 'end',
    payloadPath: 'end.dateTime',
    type: DATE
  },
  {
    label: 'Organizer',
    keyVal: 'organizer',
    payloadPath: 'organizer.email',
    disable: true,
    type: TEXT
  },
  {
    label: 'Description',
    keyVal: 'description',
    payloadPath: 'description',
    type: TEXTAREA
  },
  {
    label: 'Status',
    keyVal: 'status',
    payloadPath: 'status',
    type: TEXT
  },

]