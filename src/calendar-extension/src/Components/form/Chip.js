import React from 'react';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

import InputBase from '@material-ui/core/InputBase';

import validateEmail from '../../utils/validateEmail.js';

const statusMapping = {
  "needsAction": '',
  "accepted": "primary",
  "declined": "secondary"
}
class ChipWrapper extends React.Component {
  state = {
    open: false,
    anchorEl: null,
    input:'',
  }

  handleButtonClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: true
    })
  }

  closePopover = (cb = () => {}) => {
    this.setState({
      anchorEl: null,
      open: false,
      input: ''
    }, cb)
  }

  handlePopoverClose = () => {
    this.closePopover();
  }

  handleSubmitClick = () => {
    const { 
      input 
    } = this.state; 
    const {
      onChange,
      value = [],
      keyVal
    } = this.props;

    if (validateEmail(input)) {
      this.closePopover(() => {
        onChange(keyVal, [
          ...value,
          {
            'email': input
          }
        ])
      })
    }
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  createPopoverButton = () => {
    const {
      anchorEl,
      open,
      input
    } = this.state
    return (
      <div className="chip-btn-container">
        <Button variant="contained" color="primary" onClick={this.handleButtonClick}>
          +
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={this.handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div
            className="chip-typography"
          >
            <InputBase
              placeholder="Type in Email" 
              value={input}
              onChange={this.onInputChange}
              type="email"
            />
            <Button variant="contained" onClick={this.handleSubmitClick}> Add </Button>
          </div>
        </Popover>
      </div>
    )
  }
  
  render() {
    const {
      value = [],
      keyVal,
      onChange,
      canEdit,
      label
    } = this.props;

    let chipComp = <div />
    
    const chipFormat = value.map((val, index) => {
      return {
        key: index,
        label: val.email,
      }
    })
    const handleDelete = (deleteChip) => {
      const newChipData = value.filter((val, idx) => idx !== deleteChip.key)
      onChange(keyVal, newChipData);
    }
    chipComp = chipFormat.map((chip, index) => {
      const responseStatus = value[index].responseStatus;
      return (
        <Chip
          key={chip.key}
          label={chip.label}
          onDelete={canEdit ? () => {handleDelete(chip)} : undefined}
          color={statusMapping[responseStatus]}
          icon={responseStatus === 'tentative' ? <img className="chip-icon" src="../img/question-mark.png" /> : null}
        />
      );
    });
    
    return (
      <div>
        <div className="chip-label">{label}</div>
        <Paper className="chip-wrapper">
          {chipComp}
          {canEdit ? this.createPopoverButton() : null}
        </Paper>
      </div>
    );
  }
}

module.exports = ChipWrapper