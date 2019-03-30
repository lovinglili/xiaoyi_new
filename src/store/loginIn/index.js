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

        case types.GET_LOGININ_ASYNC+'_FULFILLED':{
            // TODO:根据真实数据
            new_state.loginInData = {
                isAssign: true
            };
            localStorage.setItem("isAssign", JSON.stringify({
                isAssign: true
            }));
             break;
        }
        // 注册
        case types.GET_LOGINUP_ASYNC+'_FULFILLED':{
            // TODO:根据真实数据
            new_state.loginInData = {
                isAssign: true
            };
            localStorage.setItem("isAssign", JSON.stringify({
                isAssign: true
            }));

             break;
        }

        // 保存nickName
        case types.STORE_NICKNAME:{
            // TODO:根据真实数据
            new_state.userInfo = action.payload;
             break;
        }

         // 退出
        case types.LOGININ_OUT+'_FULFILLED':{
            new_state.loginInData=action.payload.data.data;
            localStorage.setItem("isAssign", JSON.stringify(action.payload.data.data));
            break;
        }

        case types.POST_PUBLISH_ASYNC+'_FULFILLED':{
            new_state.publishData=action.payload.data;
            break;
        }
        default:return previous_state;
    }
    return new_state
}

export default reducer