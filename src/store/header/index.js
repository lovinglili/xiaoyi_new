import default_state from './defaultState'
import * as types from './actionTypes'

// import connect from '@connect'
// 给connect添加可以配置的atcionCreators
// import actionCreators from './actionCreators'
// connect.addActions({
//     main: actionCreators
// })

const reducer = (
    previous_state = default_state,
    action
) => {
    let new_state = Object.assign({}, previous_state)

    switch (action.type) {
        // 获取列表数据
        case types.GET_LIST_ASYNC+'_FULFILLED':{
            new_state.listData =action.payload.data.data
             break;
        }

        // 获取分类信息
        case types.GET_CATEGORY_ASYNC+'_FULFILLED':{
            new_state.categoryList =action.payload.data.data
             break;
        }
       
        default:return previous_state;
    }
    return new_state
}

export default reducer