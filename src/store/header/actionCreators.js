import * as types from './actionTypes'
import axios from 'axios'
import { message } from "antd";
export default {

    // 获取所有分类的列表信息
    fetchAllList() {
        return {
            type: types.GET_LIST_ASYNC,
            payload: new Promise(resolve => {
                axios.get('/xiaoyi/goodsList').then(response => {
                    resolve(response)
                })
            })
        }
    },

    // 改变买家余额
    changebuyerMoney(params, callback) {
        return {
            type: types.CHANGE_BUYER_MONEY,
            payload: new Promise(resolve => {
                axios(
                    { url: '/xiaoyi/changeBuyMoney', method: 'post', headers: { 'Content-Type': 'application/json' }, data: JSON.stringify(params) }
                ).then(response => {
                    const { status, data } = response.data;
                    if (status === 200 && data.success) {
                        callback(data.info[0]);
                    } else {
                        message.error(data.message);
                    }
                    resolve(response)
                })
            })
        }
    },

    // 改变卖家余额
    changeSolderMoney(params) {
        return {
            type: types.CHANGE_SOLDER_MONEY,
            payload: new Promise(resolve => {
                axios(
                    { url: '/xiaoyi/changeSolderMoney', method: 'post', headers: { 'Content-Type': 'application/json' }, data: JSON.stringify(params) }
                ).then(response => {
                    resolve(response)
                })
            })
        }
    },

    // 充值
    addUserMoney(values, callback) {
        return {
            type: types.ADD_MONEY,
            payload: new Promise(resolve => {
                axios(
                    { url: '/xiaoyi/addMoney', method: 'post', headers: { 'Content-Type': 'application/json' }, data: JSON.stringify(values) }
                ).then(response => {
                    const { status, data } = response.data;
                    if (status === 200 && data.success) {
                        callback(data.info[0]);
                    }
                    resolve(response)
                })
            })
        }
    }
}

