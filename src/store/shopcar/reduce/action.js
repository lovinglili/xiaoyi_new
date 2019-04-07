let action = {
    add(goods,price){
        return {
            type:'ADD',
            obj:{
                goods,
                price                
            }
        }
    },
    pre(goods,price){
        return (dispatch)=>{
            dispatch({
                type:'ADD',
                obj:{
                    goods,
                    price                
                }
            })
        }
    }

}

export default action;