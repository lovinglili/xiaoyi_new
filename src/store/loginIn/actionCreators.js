import * as types from './actionTypes'
import axios from 'axios'
export default {
    fetchLoginIn () {
        return {
            type: types.GET_LOGININ_ASYNC,
            payload: axios.get('/xiaoyi/assign')
            //  请求连接
        }
    }
}