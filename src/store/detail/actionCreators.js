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
    }

}