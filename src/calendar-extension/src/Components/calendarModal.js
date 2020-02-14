import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DatePicker from "react-datepicker";
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import FormFactory from './formFactory';
import formFactoryConfig from '../constants/formFactoryConfig.js'
import { getPath } from 'extension-common';
import { formFormatter } from '../utils/dataFormatter';

import "react-datepicker/dist/react-datepicker.css";

const style = {
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    backgroundColor: 'white',
    padding: '10px',
    height: '500px',
    width: '500px',
    overflow: 'scroll'
  },
}

class CalendarModal extends React.Component {
  state = {
    edit: this.props.isNew,
    info: formFormatter(this.props, formFactoryConfig)
  }


  _editView = (config) => {
    const value = getPath(this.state, `info.${config.keyVal}`)
    return (
      <div className="form-row">
        <FormFactory 
          canEdit={this.state.edit}
          config={config}
          value={value} 
          onChange={this._onInputChange} 
        />
      </div>
    )
  }
  
  _onInputChange = (key, value) => {
    this.setState({
      info: {
        ...this.state.info,
        [key]: value
      }
    })
  }

  _createDeleteBtn = () => {
    return this.state.edit && !this.props.isNew ? (
      <Button 
        className="form-button"
        variant="contained"
        onClick={() => {this.props.onSubmit(this.state.info, null, true)}}
      >
        Delete
      </Button>
    ) : null
  }

  _createSubmitBtn = () => {
    return this.state.edit ? (
      <Button 
        className="form-button"
        variant="contained" 
        color="primary" 
        onClick={() => {this.props.onSubmit(this.state.info, this.props.isNew)}}
      >
        Submit
      </Button>
    ) : null
  }

  _createForm = () => {
    return formFactoryConfig.map((form, index) => {
      return (
        <div key={`${form.keyVal}-${index}`}>
          {this._editView(form)}
        </div>
      )
    })
  }

  render() {
    const {
      open,
      handleCloseModal,
      isNew
    } = this.props;

    const {
      info,
      edit
    } = this.state;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleCloseModal}
        className={"modal"}
      >
        <div className="modal-container" style={style.paper}>
          {
            !isNew ? 
              <Switch
                checked={edit}
                onChange={()=>{this.setState({edit: !edit})}}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />: null
          }
          {this._createForm()}
          <div className="form-row">
            {this._createSubmitBtn()}
            {this._createDeleteBtn()}
          </div>
        </div>
      </Modal>
    )
  }
}

module.exports = CalendarModal;