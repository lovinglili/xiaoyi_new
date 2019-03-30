import * as types from './actionTypes'
import axios from 'axios'
export default {
    // 登录
    fetchLoginIn (values,callback) {
        return {
            type: types.GET_LOGININ_ASYNC,
            payload:new Promise(resolve=>{
                axios({url:'/xiaoyi/assign', method: 'post', headers: {'Content-Type':'application/json'},data:values}).then(response=>{
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

        // 注册
        fetchLoginUp (values,callback) {
            return {
                type: types.GET_LOGINUP_ASYNC,
                payload:new Promise(resolve=>{
                    const {phoneNumber,nickName,password}=values
                    const senValue={phoneNumber,nickName,password};
                    axios({url:'/xiaoyi/add', method: 'post', headers: {'Content-Type':'application/json'},data:JSON.stringify(senValue)}).then(response=>{
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

    // 退出
    loginOut(callback){
        return {
            type:types.LOGININ_OUT,
            payload:new Promise(resolve=>{
                axios.get('/xiaoyi/quit').then(response=>{
                    const {data:{success}}=response;
                    if(success){
                        callback();
                    }
                    resolve(response)
                })
            })
        }
    },

    // 保存 nickName
    storeNickName(values){
        return {
            type:types.STORE_NICKNAME,
            payload:values
        }
    },

    // 发布
    publishGood (values,callback) {
        return {
            type: types.POST_PUBLISH_ASYNC,
            payload:new Promise(resolve=>{
                axios({url:'/xiaoyi/publish', method: 'post', headers: {'Content-Type':'application/json'},data:JSON.stringify(values)}).then(response=>{
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