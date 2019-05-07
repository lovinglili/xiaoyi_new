
import { combineReducers } from 'redux'
import home from './home'
import loginIn from './loginIn'
import detail from './detail'
import header from './header'

// recommend reducer
export default combineReducers({
   home,
   loginIn,
   detail,
   header
})