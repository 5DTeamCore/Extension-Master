import {
  DATE,
} from '../constants/form.js';
import getPath from './getPath.js'

export const formFormatter = (data, formats) => {
  console.log(data);
  const {
    isNew,
    event: {
      start,
      end,
      eventData
    },
  } = data

  const formattedData = {}
  
  if (isNew) {
    return {
      start,
      end,
    }
  }

  formattedData['id'] = eventData.id,
  formats.forEach((format) => {
    formattedData[format.keyVal] = getPath(eventData, format.payloadPath);
  })
  return formattedData;
}

const convertDateType = (val, type) => {
  switch (type) {
    case DATE:
      return new Date(val).toISOString();
    default:
      return val
  }
}

const singlePayloadFormatter = (path, val, type) => {
  const pathSplit = path.split('.');
  const formatter = (index) => {
    if (index === pathSplit.length - 1) {
      return {
        [pathSplit[index]]: convertDateType(val, type)
      }
    } else {
      return {
        [pathSplit[index]]: formatter(index + 1)
      }
    }
  }
  return formatter(0) 
}

export const payloadFormatter = (data, formats) => {
  let payload = {}
  formats.forEach((format) => {
    payload = {
      ...payload,
      ...singlePayloadFormatter(format.payloadPath, data[format.keyVal], format.type)
    }
  })
  return payload
}