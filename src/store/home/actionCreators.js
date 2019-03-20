import * as types from './actionTypes'
import axios from 'axios'
export default {
    getListInfo () {
        return {
            type: types.GET_LIST_ASYNC,
            payload: axios.get('/malbum/recommand')
            //  请求连接
        }
    }
}