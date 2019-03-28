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

        case types.GET_DETAIL_ASYNC+'_FULFILLED':{
            // TODO:根据真实数据
            new_state.detailData = {
                isAssign: true
            };
             break;
        }

        case types.GET_DETAIL+'_FULFILLED':{
            new_state.detailData=action.payload.data.data;
            break;
        }


        default:return previous_state;
    }
    return new_state
}

export default reducer