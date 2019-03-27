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
    }
}