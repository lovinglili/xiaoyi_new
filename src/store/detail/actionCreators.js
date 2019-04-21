import * as types from './actionTypes'
import axios from 'axios'
import { message } from 'antd';

export default {
    // 详情
    getDetail(goodId, callback) {
        return {
            type: types.GET_DETAIL,
            payload: new Promise(resolve => {
                axios.get(`/xiaoyi/detail?goodId=${goodId}`).then(response => {
                    const { data: { success } } = response.data;
                    if (success) {
                        callback();
                    }
                    resolve(response)
                })
            })
        }
    },

    // 改变商品的状态商品
    changeGoodStatus(id, status,callback) {
        return {
            type: types.REMOVE_GOOD_ASYNC,
            payload: new Promise(resolve => {
                axios.get(`/xiaoyi/changeStatus?id=${id}&status=${status}`).then(response => {
                    const { data: { success } } = response.data;
                    if (success) {
                        callback();
                    }
                    resolve(response)
                })
            })
        }
    },
    // 增加收货地址 
    addAddress(values, callback) {
        return {
            type: types.ADD_ADDRESS_ASYNC,
            payload: new Promise(resolve => {
                axios({ url: '/xiaoyi/address', method: 'post', headers: { 'Content-Type': 'application/json' }, data: JSON.stringify(values) }).then(response => {
                    const { data } = response.data;
                    if (data.success) {
                        callback(data.currentAddress);
                    }
                    resolve(response);
                })
            })
        }
    },
    // 获取收货地址 
    getAddress(nickName, callback) {
        return {
            type: types.GET_ADDRESS,
            payload: new Promise(resolve => {
                axios.get(`/xiaoyi/addressList?nickName=${nickName}`).then(response => {
                    const { data } = response.data;
                    if (data.length!==0) {
                        callback();
                    }else{
                        message.error('当前没有地址信息，请添加~')
                    }
                    resolve(response)
                })
            })
        }
    },
    // 删除订单
    deleteAddress(id,callback){
        return {
            type: types.DELETE_ADDRESS,
            payload: new Promise(resolve => {
                axios.get(`/xiaoyi/deleteAddress?addressId=${id}`).then(response => {
                    const { data: { success } } = response.data;
                    if (success) {
                        callback();
                    }
                    resolve(response)
                })
            })
        }
    },
    // 获取订单 
    getOrderList(nickName, callback) {
        return {
            type: types.GET_ORDERLIST,
            payload: new Promise(resolve => {
                axios.get(`/xiaoyi/orderList?nickName=${nickName}`).then(response => {
                    const { data: { success } } = response.data;
                    if (success) {
                        callback();
                    }
                    resolve(response)
                })
            })
        }
    },



    // 获取预售出的列表（被下单）
    getWillSoldOrderList(solderNickName, callback) {
        return {
            type: types.GET_WILLSOLD_ORDERLIST,
            payload: new Promise(resolve => {
                axios.get(`/xiaoyi/orderList?solderNickName=${solderNickName}`).then(response => {
                    const { data: { success } } = response.data;
                    if (success) {
                        callback();
                    }
                    resolve(response)
                })
            })
        }
    },

    // 添加交易表
    addDeal (values,callback){
        return {
            type: types.ADD_DEAL_ASYNC,
            payload: new Promise(resolve => {
                axios({ url: '/xiaoyi/addDeal', method: 'post', headers: { 'Content-Type': 'application/json' }, data: JSON.stringify(values) }).then(response => {
                    const { data } = response.data;
                    if (data.success) {
                        callback();
                    }
                })
            })
        }
    },

    // 改变交易表的状态
    changeDealStatus(id, status,callback) {
        return {
            type: types.CHANGE_ORDER_ASYNC,
            payload: new Promise(resolve => {
                axios.get(`/xiaoyi/changeDealStatus?id=${id}&status=${status}`).then(response => {
                    const { data: { success } } = response.data;
                    if (success) {
                        callback();
                    }
                    resolve(response)
                })
            })
        }
    },

    addOrder(values, callback) {
        return {
            type: types.ADD_ORDER_ASYNC,
            payload: new Promise(resolve => {
                axios({ url: '/xiaoyi/addOrder', method: 'post', headers: { 'Content-Type': 'application/json' }, data: JSON.stringify(values) }).then(response => {
                    const { data } = response.data;
                    if (data.success) {
                        callback();
                    }
                    // resolve(response);
                })
            })
        }
    },
    //  取消订单
    cancelOrder(id, callback) {
        return {
            type: types.DELETE_ORDERLIST,
            payload: new Promise(resolve => {
                axios.get(`/xiaoyi/deleteOrder?orderId=${id}`).then(response => {
                    const { data: { success } } = response.data;
                    if (success) {
                        callback();
                    }
                    resolve(response)
                })
            })
        }
    },

    // 改变订单的状态
    changeOrderStatus(id, status,callback) {
        return {
            type: types.CHANGE_ORDER_ASYNC,
            payload: new Promise(resolve => {
                axios.get(`/xiaoyi/changeOrderStatus?id=${id}&orderStatus=${status}`).then(response => {
                    const { data: { success } } = response.data;
                    if (success) {
                        callback();
                        message.success('操作成功')
                    }
                    resolve(response)
                })
            })
        }
    },

    // 编辑更新
    updateGood (values,callback) {
        return {
            type: types.POST_UPDATE_ASYNC,
            payload:new Promise(resolve=>{
                axios({url:'/xiaoyi/update', method: 'post', headers: {'Content-Type':'application/json'},data:JSON.stringify(values)}).then(response=>{
                   console.log(response,"response")
                    const {data:{success}}=response.data;
                    if(success){
                        callback();
                    }
                    resolve(response);
                })
            }) 
        }
    },
}