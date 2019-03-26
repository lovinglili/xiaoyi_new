import * as types from './actionTypes'
import axios from 'axios'
export default {
    fetchLoginIn (values) {
        return {
            type: types.GET_LOGININ_ASYNC,
            payload: axios({url:'/xiaoyi/assign', method: 'post', headers: {'Content-Type':'application/json'},data:values})
        }
    }
}