// reducers.js
import { REQUEST_DATA, DATA_SUCCESS, DATA_FAILURE } from './actions';

const initialState = {
  loading: false,
  error: null,
  queryName:null,
  data:null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        loading: true,
        queryName:action.payload,
        error:null
      };
    case DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data:action.payload,
        error:null
      };
    case DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: '404 Not Found'
      };
    default:
      return state;
  }
};

export default reducer;
