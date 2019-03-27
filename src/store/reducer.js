
import { combineReducers } from 'redux'
import home from './home'
import loginIn from './loginIn'
import detail from './detail'

// recommend reducer
export default combineReducers({
   home,
   loginIn,
   detail
})