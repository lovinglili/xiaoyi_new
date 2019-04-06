import * as types from './actionTypes'
import axios from 'axios'
export default {
    // 详情
    getDetail (goodId, callback) {
        return {
            type:types.GET_DETAIL,
            payload:new Promise(resolve=>{
                // TODO:
                axios.get(`/xiaoyi/detail?goodId=${goodId}`).then(response=>{
                    const {data:{success}}=response;
                    if(success){
                        callback();
                    }
                    resolve(response)
                })
            })
        }
    },
     // 增加收货地址 TODO
     addAddress (values,callback) {
        return {
            type: types.ADD_ADDRESS_ASYNC,
            payload:new Promise(resolve=>{
                const { privanceId, privanceName, cityId, cityName, more } = values;
                const senValue ={ privanceId, privanceName, cityId, cityName, more };
                axios({url:'/xiaoyi/address', method: 'post', headers: {'Content-Type':'application/json'},data:JSON.stringify(senValue)}).then(response=>{
                   // TODO:后端会返回success，联调的时候改一下判断条件就好
                    const {data={}}=response;
                    if(Object.keys(data).length!==0){
                        callback();
                    }
                    resolve(response);
                })
            }) 
        }
    },
    // 获取收货地址 TODO
    getAddress (nickName, callback) {
        return {
            type:types.GET_ADDRESS,
            payload:new Promise(resolve=>{
                // TODO:
                axios.get(`/xiaoyi/addressList?nickName=${nickName}`).then(response=>{
                    const {data:{success}}=response;
                    if(success){
                        callback();
                    }
                    resolve(response)
                })
            })
        }
   },
   // 获取订单 TODO
   getOrderList (nickName, callback) {
       return {
           type:types.GET_ORDERLIST,
           payload:new Promise(resolve=>{
               // TODO:
               axios.get('/xiaoyi/orderList').then(response=>{
                   const {data:{success}}=response;
                   if(success){
                       callback();
                   }
                   resolve(response)
               })
           })
       }
   },
   // 获取城市列表 TODO
//    getCities (callback) {
//        return {
//            type:types.GET_CITIES,
//            payload:new Promise(resolve=>{
//                // TODO:
//                axios.get('/xiaoyi/cities').then(response=>{
//                    const {data:{success}}=response;
//                    if(success){
//                        callback();
//                    }
//                    resolve(response)
//                })
//            })
//        }
//    },
   // 提交订单 TODO
   addOrder (values,callback) {
    return {
        type: types.ADD_ORDER_ASYNC,
        payload:new Promise(resolve=>{
            const {addressId,nickName,goodId}=values
            const senValue={addressId,nickName,goodId};
            axios({url:'/xiaoyi/addOrder', method: 'post', headers: {'Content-Type':'application/json'},data:JSON.stringify(senValue)}).then(response=>{
               // TODO:后端会返回success，联调的时候改一下判断条件就好
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