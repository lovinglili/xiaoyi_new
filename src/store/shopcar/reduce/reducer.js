import _state from './state';

let reducer=(state=_state,action)=>{
    let newState = {...state};
    if(action.type==='ADD'){
        action.obj.id = ++newState.count;
        newState.list.push(action.obj)
    }
    return newState;
   
}

export default reducer;