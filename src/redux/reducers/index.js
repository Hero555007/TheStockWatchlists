import {combineReducers} from 'redux'
import common from './common'
import user from './user'
import chart from './chart'
import notification from './notification'

export default combineReducers({
  common,
  user,
  chart,
  notification,
})

