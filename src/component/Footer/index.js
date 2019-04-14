import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import connect from "@connect";
import { Footer } from "./styles";


class FooterContainer extends Component {

  render() {
    return (
        <Footer className="foot">
          <div className="foot-panel">
            <div className="foot-panel-inner cf">
              <div className="up-left">
                <div className="up-left-slogan">来<span style={{color: "red"}}>小易</span>.买卖商品  闲置可以赚钱花</div>
              </div> 
              <div className="up-right"> </div>
            </div>
          </div>
          <div className="foot-bar cf">
            <div className="foot-bar-inner">
              <div className="foot-bar-up">
                <span>小易</span>
                <span>联系我们:975130528@qq.com</span>
              </div> 
              <div className="foot-bar-down">
                <span>作者联系方式：18438651123</span>
                <span>Copyright©2018-2019 小易xiaoyi.com 版权所有</span>
              </div>
            </div>
          </div>
        </Footer>
        );
      }
    }
    
    export default withRouter(
      connect(
        FooterContainer,
        [
      {name: "loginIn" },
      {name: "header", state: ["categoryList"] }
      ]
    )
  );
