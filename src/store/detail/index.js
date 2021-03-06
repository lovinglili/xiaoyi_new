import default_state from './defaultState'
import * as types from './actionTypes'

const reducer = (
    previous_state = default_state,
    action
) => {
    let new_state = Object.assign({}, previous_state)

    switch (action.type) {

        // case types.GET_DETAIL_ASYNC+'_FULFILLED':{
        //     new_state.detailData = {
        //         isAssign: true
        //     };
        //      break;
        // }

        case types.GET_DETAIL+'_FULFILLED':{
            new_state.detailData=action.payload.data.data[0];
            break;
        }

        case types.ADD_ADDRESS_ASYNC+'_FULFILLED':{
            new_state.currentAddress = action.payload.data.data.currentAddress;
             break;
        }

        case types.GET_ADDRESS+'_FULFILLED':{
            new_state.addressList=action.payload.data.data;
            break;
        }


        case types.GET_ORDERLIST+'_FULFILLED':{
            new_state.orderList=action.payload.data.data;
            break;
        }

        case types.GET_WILLSOLD_ORDERLIST+'_FULFILLED':{
            new_state.willSolderList=action.payload.data.data;
            break;
        }

        case types.POST_UPDATE_ASYNC+'_FULFILLED':{
            new_state.updateData=action.payload.data;
            break;
        }
        
        default:return previous_state;
    }
    return new_state
}

export default reducer