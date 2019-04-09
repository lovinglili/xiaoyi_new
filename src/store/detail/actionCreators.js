import * as types from './actionTypes'
import axios from 'axios'

export default {
    // 详情
    getDetail(goodId, callback) {
        return {
            type: types.GET_DETAIL,
            payload: new Promise(resolve => {
                axios.get(`/xiaoyi/detail?goodId=${goodId}`).then(response => {
                    const { data: { success } } = response;
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
                    const { data: { success } } = response;
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
                    const { data: { success } } = response;
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
                    const { data: { success } } = response;
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
    // 提交订单 TODO购物车
    //    addGoods (values,callback) {
    //     console.log('values,addOrder/redux中：', values);
    //     let result = api.addGoods(values)
    //     return {
    //      type: types.ADD_ORDER_ASYNC,
    //      payload: result.goods
    //     }
    //    },

    // 编辑更新
    updateGood (values,callback) {
        return {
            type: types.POST_UPDATE_ASYNC,
            payload:new Promise(resolve=>{
                axios({url:'/xiaoyi/update', method: 'post', headers: {'Content-Type':'application/json'},data:JSON.stringify(values)}).then(response=>{
                    const {data={}}=response;
                    if(Object.keys(data).length!==0){
                        callback();
                    }
                    resolve(response);
                })
            }) 
        }
    },
}