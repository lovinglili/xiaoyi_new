import * as types from './actionTypes'
import { message } from "antd";
import axios from 'axios'
export default {
    // 登录
    fetchLoginIn (values,callback) {
        return {
            type: types.GET_LOGININ_ASYNC,
            payload:new Promise(resolve=>{
                axios({url:'/xiaoyi/assign', method: 'post', headers: {'Content-Type':'application/json'},data:values}).then(response=>{
                   const {status,data}=response.data;
                   if(status===200 && !data.message){
                       callback();
                   }else{
                       message.error(data.message)
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
                       const {status,data}=response.data;
                        if(status===200 && data.message !=="用户已存在"){
                            callback();
                        }else{
                            message.error(data.message)
                        }
                        resolve(response);
                    })
                }) 
            }
        },

    // 退出
    loginOut(values,callback){
        return {
            type:types.LOGININ_OUT,
            payload:new Promise(resolve=>{
                axios({url:'/xiaoyi/quit', method: 'post', headers: {'Content-Type':'application/json'},data:values}).then(response=>{
                    const {status}=response.data;
                    if(status===200){
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