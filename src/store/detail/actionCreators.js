import * as types from './actionTypes'
import axios from 'axios'
export default {
    // 详情
    getDetail (callback) {
        return {
            type:types.GET_DETAIL,
            payload:new Promise(resolve=>{
                // TODO:
                axios.get('/xiaoyi/detail').then(response=>{
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
                axios({url:'/xiaoyi/address', method: 'post', headers: {'Content-Type':'application/json'},data:values}).then(response=>{
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
    getAddress (callback) {
        return {
            type:types.GET_ADDRESS,
            payload:new Promise(resolve=>{
                // TODO:
                axios.get('/xiaoyi/addressList').then(response=>{
                    const {data:{success}}=response;
                    if(success){
                        callback();
                    }
                    resolve(response)
                })
            })
        }
   }

}