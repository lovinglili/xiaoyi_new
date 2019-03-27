import * as types from './actionTypes'
import axios from 'axios'
export default {
    // 登录
    fetchLoginIn (values) {
        return {
            type: types.GET_LOGININ_ASYNC,
            payload: axios({url:'/xiaoyi/assign', method: 'post', headers: {'Content-Type':'application/json'},data:values})
        }
    },

    // 退出
    loginOut(){
        return {
            type:types.LOGININ_OUT
        }
    }
}