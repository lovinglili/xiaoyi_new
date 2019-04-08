import * as types from './actionTypes'
import axios from 'axios'
export default {
   
    // 获取所有分类的列表信息
    fetchAllList(){
        return {
            type:types.GET_LIST_ASYNC,
            payload:new Promise(resolve=>{
                axios.get('/xiaoyi/goodsList').then(response=>{
                    resolve(response)
                })
            })
        }
    },

}