import React, { Component } from "react";
import { Icon, Dropdown, Row, Col, Input } from "antd";
import { Link, withRouter } from "react-router-dom";
import connect from "@connect";
import createActionLoginIn from "../../store/header/actionCreators";
import { Footer } from "./styles";
import { Category, LogoFont } from "@s";

// 登录

connect.addActions({
  header: createActionLoginIn
});

const Search = Input.Search;

class FooterContainer extends Component {
  state = {
    categoryList: []
  };

  // 渲染组件的时候就去请求所有的数据
  componentDidMount() {
  }

  render() {
    const {
      type,
      loginIn: { loginInData = {}, userInfo = {} },
      header: { categoryList = [] }
    } = this.props;
    // 后端这个地方放回的是一个标志，json-server返回了用户的信息
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
                <span>联系我们</span>
              </div> 
              <div className="foot-bar-down">
                <span>作者联系方式：xxxxx</span>
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
