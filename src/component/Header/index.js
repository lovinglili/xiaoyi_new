import React, { Component } from "react";
import { Icon, Dropdown, Row, Col, Input } from "antd";
import { Link, withRouter } from "react-router-dom";
import connect from "@connect";
import createActionLoginIn from "../../store/header/actionCreators";
import { CategoryContainer, Header } from "./styles";
import { Category, LogoFont } from "@s";

// 登录

connect.addActions({
  header: createActionLoginIn
});

const Search = Input.Search;

class HeaderContainer extends Component {
  state = {
    categoryList: []
  };

  // 渲染组件的时候就去请求所有的数据
  componentDidMount() {
    const { header_actions, loginIn_actions, loginIn } = this.props;
    if (localStorage["isAssign"] && localStorage["user"]) {
      const isAssigned = JSON.parse(localStorage.getItem("isAssign"));
      const rememberMe = JSON.parse(localStorage.getItem("user"));
      const { isAssign, currentTime } = isAssigned;
      if (isAssign) {
        const endTime = new Date().getTime();
        if (currentTime + 3600000 < endTime && isAssign) {
          this.handleExit();
        } else {
          if (isAssign && Object.keys(loginIn.userInfo).length === 0) {
            loginIn_actions.fetchLoginIn(JSON.stringify(rememberMe), () => {});
            loginIn_actions.storeNickName(rememberMe);
          }
        }
      }
    }
    header_actions.fetchAllList();
  }

  // 退出，返回到首页，store的数据清空
  handleExit = () => {
    const {
      loginIn_actions,
      loginIn: { userInfo }
    } = this.props;
    loginIn_actions.loginOut(userInfo, this.quitSuccess); // 退出
  };

  quitSuccess = () => {
    this.props.history.push({ pathname: "/home" });
  };

  // 分类搜索
  handleHeaderSearch = (value, type, id = "") => {
    const { handleSearch } = this.props;
    if (handleSearch) {
      handleSearch(value, type);
      this.props.history.push({
        state: { name: value, type }
      });
    } else {
      this.props.history.push({
        pathname: `/category:${id}`,
        state: { name: value, type }
      });
    }
  };

  render() {
    const {
      type,
      loginIn: { loginInData = {}, userInfo = {} },
      header: { categoryList = [] }
    } = this.props;
    // 后端这个地方放回的是一个标志，json-server返回了用户的信息
    const { isAssign } = loginInData;
    const { nickName } = userInfo;
    const category = (
      <CategoryContainer>
        <div>
          <img
            src={Category}
            alt=""
            style={{ marginTop: 10, width: "95%", height: "80px" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {categoryList.length !== 0 && (
            <Row gutter={16}>
              {categoryList.map(item => (
                <Col span={8} key={item.categoryId}>
                  <dl>
                    <dt>
                      <h4>{item.categoryTitle}</h4>
                    </dt>
                    {item.list.map(good => (
                      <dd key={good.id}>
                        <a
                          onClick={() =>
                            this.handleHeaderSearch(good.name, "head", good.id)
                          }
                        >
                          {good.name}
                        </a>
                      </dd>
                    ))}
                  </dl>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </CategoryContainer>
    );
    return (
      <Header>
        <Row>
          <Col span={8}>
            <span
              onClick={() => {
                this.props.history.push("home");
              }}
              style={{ fontSize: "40px", color: "#35b7b2", cursor: "pointer" }}
            >
              小易
            </span>
          </Col>
          {type === "loginUp" && (
            <div>
              <Col span={8}>欢迎注册</Col>
              <Col span={8}>
                <Link to="/loginIn">
                  <span style={{ color: "#000" }}>已有账号？</span>&nbsp;去登录
                  >
                </Link>
              </Col>
            </div>
          )}
          {type === "loginIn" && (
            <div>
              <Col span={8}>欢迎登录</Col>
              <Col span={8}>
                <Link to="/loginIn">登录</Link>
                <Link to="/loginUp">注册</Link>
              </Col>
            </div>
          )}
          {!type && (
            <div>
              <Col span={8}>
                <Search
                  placeholder="搜索感兴趣的物品~"
                  onSearch={value => this.handleHeaderSearch(value, "input")}
                  enterButton
                  style={{ width: 350, margin: "24px 0" }}
                />
              </Col>
              <Col span={8}>
                <Dropdown overlay={category}>
                  <a>
                    分类&nbsp;
                    <Icon type="down" />
                  </a>
                </Dropdown>
                {!isAssign && (
                  <span>
                    <Link to="/loginIn">登录</Link>
                    <Link to="/loginUp">注册</Link>
                  </span>
                )}
                {isAssign && (
                  <span>
                    <Link to="/myself">{nickName}</Link>
                    <a onClick={this.handleExit}>退出</a>
                  </span>
                )}
              </Col>
            </div>
          )}
        </Row>
      </Header>
    );
  }
}

export default withRouter(
  connect(
    HeaderContainer,
    [{ name: "loginIn" }, { name: "header", state: ["categoryList"] }]
  )
);
