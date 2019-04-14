import React, { Component } from "react";
import { Icon, Dropdown, Row, Col, Input } from "antd";
import { Link, withRouter } from "react-router-dom";
import connect from "@connect";
import createActionLoginIn from "../../store/header/actionCreators";
import { Header } from "./styles";
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
        <div class="foot">
          <div class="foot-panel">
            <div class="foot-panel-inner cf">
              <div class="up-left">
                <img src="/static/img/bottom_slogan@2x.306d20c.png" alt="" class="up-left-slogan"/>
              </div> 
              <div class="up-right"> </div>
            </div>
          </div>
          <div class="foot-bar cf">
            <div class="foot-bar-inner">
              <div class="foot-bar-up">
                <a href="/contact.html">关于拍拍</a>
                <a href="/contact.html#contact">联系我们</a>
              </div> 
              <div class="foot-bar-down">
                <a href="//www.miibeian.gov.cn" target="_blank">粤ICP备13011462号-2</a> 
                <span>客服电话：400-612-2333</span>
                <span>Copyright©2017-2018 拍拍paipai.com版权所有</span>
              </div>
            </div>
          </div>
        </div>
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
