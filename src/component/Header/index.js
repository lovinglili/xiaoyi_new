import React, { Component } from "react";
import { Icon, Dropdown, Row, Col, Input } from "antd";
import { Link,withRouter } from "react-router-dom";
import connect from "@connect";
import { CategoryContainer, Header } from "./styles";
// 登录

const Search = Input.Search;

const categoryList = [
  {
    categoryTitle: "手机数码",
    categoryId: 111,
    list: [
      { id: "1", name: "蓝牙耳机" },
      { id: "2", name: "数据线" },
      { id: "3", name: "手环" },
      { id: "4", name: "相机" },
      { id: "5", name: "其他手机数码" }
    ],
  },
  {
    categoryTitle: "服饰",
    list: [
      { id: "6", name: "半身裙" },
      { id: "7", name: "牛仔裤" },
      { id: "8", name: "衬衫" },
      { id: "9", name: "外套" },
      { id: "10", name: "其他服饰" }
    ],
    categoryId: 222
  },
  {
    categoryTitle: "美妆",
    list: [
      { id: "11", name: "洁面用品" },
      { id: "12", name: "防晒" },
      { id: "13", name: "粉底液" },
      { id: "14", name: "香水" },
      { id: "15", name: "其他美妆" }
    ],
    categoryId: 333
  }
];

class HeaderContainer extends Component {
  // 搜索数据
  // TODO: 请求所有的数据，前端用于分页，搜索排序
  // componentDidMount(){

  // }

  // 退出，返回到首页，store的数据清空
  handleExit=()=>{
    this.props.history.push({ pathname: '/home'});
  }


  render() {
    const { type,loginIn:{loginInData={}} }=this.props;
    // 后端这个地方放回的是一个标志，json-server返回了用户的信息
    const loginDataLen=Object.keys(loginInData).length;
    console.log(loginDataLen,"loginDataLen")
    // 判断loginDataLen 的长度是否为空，来显示头部退出
    const category = (
      <CategoryContainer>
        <div>图片</div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Row gutter={16}>
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
          </Row>
        </div>
      </CategoryContainer>
    );
    return (
      <Header>
        <Row>
          <Col span={8}>
            <img scr="" alt="" />
          </Col>
          {type==='loginUp'  && <div><Col span={8}>欢迎注册</Col><Col span={8}>已有账号？<Link   to="/loginIn">去登录 ></Link></Col></div>}
          {type==='loginIn'  && <div><Col span={8}>欢迎登录</Col><Col span={8}><Link to="/loginIn">登录</Link><Link   to="/loginUp">注册</Link></Col></div>}
          {!type && (  <div><Col span={8}>
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
            {loginDataLen ===0  && (<span> <Link to="/loginIn">登录</Link>
            <Link to="/loginUp">注册</Link></span>)}
            {loginDataLen !==0  && (<span> <Link to="/loginIn">登录</Link>
            <a onClick={this.handleExit}>退出</a></span>)}
           
          </Col></div> )}

       
        </Row>
      </Header>
    );
  }
}

export default withRouter(
  connect(
    HeaderContainer,
    [{ name: "loginIn", state: ["loginInData"] }]
  )
);
