// actions.js
export const REQUEST_DATA = 'REQUEST_DATA';
export const DATA_SUCCESS = 'DATA_SUCCESS';
export const DATA_FAILURE = 'DATA_FAILURE';

export const requestData = (name) => ({
  type: REQUEST_DATA,
  payload:name
});

export const dataSuccess = (data) => ({
  type: DATA_SUCCESS,
  payload:data
});

export const dataFailure = () => ({
  type: DATA_FAILURE
});
