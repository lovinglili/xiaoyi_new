import React, { Component } from "react";
import { Icon, Dropdown, Row, Col, Input } from "antd";
import { Link, withRouter } from "react-router-dom";
import connect from "@connect";
import createActionLoginIn from "../../store/header/actionCreators";
import { CategoryContainer, Header } from "./styles";
// 登录

connect.addActions({
  header: createActionLoginIn
});

const Search = Input.Search;

class HeaderContainer extends Component {

  state={
    categoryList:[]
  }

  // 渲染组件的时候就去请求所有的数据
  componentDidMount(){
    const {header_actions}=this.props;
    header_actions.fetchAllList();
    header_actions.fetchCategoryInfo();
  }



  // 退出，返回到首页，store的数据清空
  handleExit = () => {
    const { loginIn_actions } = this.props;
    loginIn_actions.loginOut(this.quitSuccess) // 退出
  }

  quitSuccess = () => {
    this.props.history.push({ pathname: '/home' });

  }

  render() {
    const { type, loginIn: { loginInData = {}, userInfo = {} },header:{categoryList=[]}} = this.props;
    // 后端这个地方放回的是一个标志，json-server返回了用户的信息
    const { isAssign } = loginInData;
    const { nickName } = userInfo;
    const category = (
      <CategoryContainer>
        <div>图片</div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
        {categoryList.length!==0 && ( <Row gutter={16}>
            {categoryList.map(item => (
              <Col span={8} key={item.categoryId}>
                <dl>
                  <dt>
                    <h4>{item.categoryTitle}</h4>
                  </dt>
                  {item.list.map(good => (
                    <dd key={good.id}>
                      <Link
                        to={{
                          pathname: `/category:${good.id}`,
                          state: { goodName: good.name }
                        }}
                      >
                        {good.name}
                      </Link>
                    </dd>
                  ))}
                </dl>
              </Col>
            ))}
          </Row>)}
         
        </div>
      </CategoryContainer>
    );
    return (
      <Header>
        <Row>
          <Col span={8}>
            <img scr="" alt="" />
          </Col>
          {type === 'loginUp' && <div><Col span={8}>欢迎注册</Col><Col span={8}>已有账号？<Link to="/loginIn">去登录 ></Link></Col></div>}
          {type === 'loginIn' && <div><Col span={8}>欢迎登录</Col><Col span={8}><Link to="/loginIn">登录</Link><Link to="/loginUp">注册</Link></Col></div>}
          {!type && (<div><Col span={8}>
            <Search
              placeholder="input search text"
              onSearch={value => this.handleSearch(value)}
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
              {/* //TODO，后端会返回标志 判断loginDataLen 的长度是否为空，来显示头部退出 */}
              {!isAssign && (<span> <Link to="/loginIn">登录</Link>
                <Link to="/loginUp">注册</Link></span>)}
              {isAssign && (<span> <Link to="/myself">{nickName}</Link>
                <a onClick={this.handleExit}>退出</a></span>)}

            </Col></div>)}
        </Row>
      </Header>
    );
  }
}

export default withRouter(
  connect(
    HeaderContainer,
    [{ name: "loginIn", state: ["loginInData"] },{name:"header",state:["categoryList"]}]
  )
);
