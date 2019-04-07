import React, { Component } from 'react';
import "whatwg-fetch"
// import '../../../assets/css/gwc/gwc.css'
class TestContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            arr:[],
            sum_price:0
        }
        console.log(props)
    }
    //获取数据
    componentWillMount(){
        var url="./js/shopping.json"
        fetch(url).then((res)=>{
            return res.json()
        }).then((res)=>{
            this.setState({
                arr:res
            })
        })
    }
    //获取输入框的值
    getInputText=(e,i)=>{
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index===i){
                    ele.num=e.target.value
                    return ele
                }else {
                    return ele
                }
            })
        })
        this.SumPrice()
    }
    //jia
    augment=(e,i)=>{
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index===i){
                    ele.num=ele.num*1+1
                    return ele
                }else {
                    return ele
                }
            })
        })
        this.SumPrice()
     }
    //jian
    reduce=(e,i)=> {
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index==i){
                    ele.num=ele.num*1-1
                    return ele
                }else {
                    return ele
                }
            })
        })
        this.SumPrice()
    }

    //删除
    del=(e,i)=> {
        this.setState({
            arr:this.state.arr.filter((ele,index)=>{
                if(index!==i){
                    return true
                }else {
                    return false
                }
            })
        })
        setTimeout(()=>{
            this.SumPrice()
        },1)
    }

    // 实现全选与反选的操作
    CheckAllorNoAll=(e,i)=>{
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index===i){
                    ele.checked=!ele.checked
                }
                return ele
            })
        })
        var flag=this.state.arr.every((ele,index)=>{
            if(ele.checked===false){
                return false
            }else {
                return true
            }
        })
        if(flag===true){
            this.refs.checkALL.checked=true
        }else {
            this.refs.checkALL.checked=false
        }
        this.SumPrice()
    }
    //全选全不选,判断全选状态
    CheckedAll=(e)=>{
        if(e.target.checked==true){
            this.setState({
                arr:this.state.arr.map((ele,index)=>{
                    ele.checked=true
                    return ele
                })
            })
        }else  if(e.target.checked==false){
            this.setState({
                arr:this.state.arr.map((ele,index)=>{
                    ele.checked=false
                    return ele
                })
            })
        }
        this.SumPrice()

    }
    //计算总合计
    SumPrice=()=>{
        var sum=0
        this.state.arr.forEach((ele,index)=>{
            if(ele.checked===true){
             sum+=ele.num*ele.new_price
            }
        })
        this.setState({
            sum_price:sum
        })
    }
    //结算传值
    SettleAccounts=()=>{
        var shopping=[]
        this.state.arr.forEach((ele,index)=>{
            if(ele.checked===true){
                shopping.push(ele)
            }
        })
        console.log(shopping)
        window.localStorage.setItem("shopping",JSON.stringify(shopping))
        window.localStorage.setItem("sumprice",JSON.stringify(this.state.sum_price))
        this.props.history.push('/tab4')
    }
    render() {
        return (
            <div className="App">
                <div className="G_header">
                    <h1>购物车</h1>
                </div>
                <div className='section'>
                    {
                        this.state.arr.map((ele,index)=>{
                            return(
                                <div className="G_list" key={index}>
                                    <div className="G_Checked">
                                        <input type="checkbox" checked={ele.checked} onChange={
                                            (e)=>{
                                                this.CheckAllorNoAll(e,index)
                                            }
                                        }/>
                                    </div>
                                    <div className="G_img">
                                        <img src={ele.img} alt=""/>
                                    </div>
                                    <div className="G_Content">
                                        <div className="G_selected">
                                            <button onClick={
                                                (e)=>{
                                                    this.augment(e,index)
                                                }
                                            }>+</button>
                                            <input type="text" ref="nums" value={ele.num} onChange={
                                                (e)=>{
                                                  this.getInputText(e,index)
                                                }
                                            }/>
                                            <button onClick={
                                                (e)=>{
                                                    this.reduce(e,index)
                                                }
                                            }>-</button>
                                        </div>
                                        <div className="G_text">
                                            <p>{ele.name}</p>
                                            <p>
                                                单价：<span>{ele.new_price}</span>
                                                小计：<span>{ele.num*ele.new_price}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="G_del">
                                        <button onClick={
                                            (e)=>{
                                                this.del(e,index)
                                            }
                                        }>删除</button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="G_footer">
                    <div className="G_Checkbox">
                        <input type="checkbox" ref="checkALL" onChange={
                            (e)=>{
                                this.CheckedAll(e)
                            }
                        }/>全选
                    </div>
                    <div className="G_Price">
                        合计：{this.state.sum_price}
                    </div>
                    <div className="G_Button">
                        <button onClick={()=>{
                            this.SettleAccounts()
                        }}>结算</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default TestContainer