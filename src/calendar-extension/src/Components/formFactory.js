import React from 'react';
import {
  DATE,
  TEXT,
  TEXTAREA,
  CHIP,
} from '../constants/form';
import DatePicker from "react-datepicker";
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Chip from './form/Chip'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import '../css/formFactory.css';

export default ({canEdit, config: { type, keyVal, label, disable }, value, onChange}) => {
  let cp = (<div>{String(value)}</div>)
    switch (type) {
      case DATE:
        cp = (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label={`${label} Date`}
              value={value}
              onChange={(val) => { onChange(keyVal, val)}}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label={`${label} Time`}
              value={value}
              onChange={(val) => { onChange(keyVal, val)}}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        )
        break;
      case TEXT:
        cp = (
          <TextField
            id="filled-secondary"
            label={label}
            variant="standard"
            onChange={(e) => { onChange(keyVal, e.target.value) }} 
            value={value}
            fullWidth
            disabled={!canEdit || !!disable}
          />
        )
        break;
      case TEXTAREA:
        cp = (
          <TextareaAutosize 
            aria-label="minimum height" 
            rowsMin={5}
            placeholder="Enter Description here" 
            onChange={(e) => { onChange(keyVal, e.target.value) }}
            value={value}
            disabled={!canEdit}
          />
        )
        break;
      case CHIP:
        console.log(value)
        cp = (
          <Chip value={value} keyVal={keyVal} label={label} onChange={onChange} canEdit={canEdit}/>
        )
      default:
        break;
    }
  return cp;
}
