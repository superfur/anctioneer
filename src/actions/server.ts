import {
  CHECK,
} from '../constants/server'

export const check = (payload: string) => {
  return {
    type: CHECK,
    payload
  }
}
