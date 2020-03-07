import { combineReducers } from 'redux'

import notifications from './notifications'
import users from './user'
export default combineReducers({
  notifications,
  users
})
