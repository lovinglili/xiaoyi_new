import * as types from './actionTypes'
import axios from 'axios'
export default {
 // 提交订单 TODO
 addOrder (values,callback) {
    return {
        type: types.ADD_ORDER_ASYNC,
        payload: values 
    }
 }
}