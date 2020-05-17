import { CHECK } from '../constants/server';

const INITIAL_STATE = {
  serverName: ''
}

export default function checkServer (state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case CHECK:
      return {
        ...state,
        serverName: payload,
      }
     default:
       return state
  }
}
