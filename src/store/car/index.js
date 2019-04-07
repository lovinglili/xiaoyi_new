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

        case types.ADD_ADDRESS_ASYNC+'_FULFILLED':{
            // TODO:根据真实数据
            new_state.addressList = {
                isAssign: true
            };
             break;
        }

        case types.GET_ADDRESS+'_FULFILLED':{
            new_state.addressList=action.payload.data.data;
            break;
        }

        case types.GET_CITIES+'_FULFILLED':{
            new_state.citiesList=action.payload.data.data;
            break;
        }

        case types.GET_ORDERLIST+'_FULFILLED':{
            new_state.orderList=action.payload.data.data;
            break;
        }

        case types.ADD_ORDER_ASYNC+'_FULFILLED':{
            // TODO:根据真实数据
            new_state.orderList = {
                isAssign: true
            };
             break;
        }
        default:return previous_state;
    }
    return new_state
}

export default reducer