import React, { Component } from "react";
import { SubmitOrder } from "./styles.js";
import { Link,withRouter } from "react-router-dom";
import connect from "@connect";
import { Layout, Card, Col, Row, Pagination, Icon, Menu } from "antd";
import HeaderContainer from "@c/Header";
import { Category, ContentCon, DetailCardContainer } from "../category/styles.js";
import createActionDetail from "../../store/detail/actionCreators";
const {
  Header, Footer, Sider, Content,
} = Layout;

connect.addActions({
  detail: createActionDetail
});

const gridStyle = {
  width: '50%',
  textAlign: 'center',
};

// 登录
class DetailContainer extends Component {

  componentDidMount(){
    const {detail_actions, detail}=this.props;
    detail_actions.getDetail(this.toConsole)
    // console.log("this.props:", this.props, detail.detailData);
    // const rememberUser= JSON.parse(localStorage.getItem("user"));
    // this.setState({
    //   assignUser:rememberUser
    // })
  }
  toConsole() {
    console.log(2333);
  }

  render() {
    const { detail}=this.props;
    console.log("this.props:", this.props, detail.detailData, detail.detailData.pics ? detail.detailData.pics[0]: "");
    let myDetailData = Object.keys(detail.detailData).length !== 0 ? detail.detailData : {};
    let myPics = detail.detailData.pics ? detail.detailData.pics : [];
    return (
      <SubmitOrder>
        <Layout>
          <Header>
            <HeaderContainer />
          </Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </SubmitOrder>
    );
  }
}

// export default DetailContainer;
export default withRouter(
  connect(
    DetailContainer,
    [{ name: "detail", state: ["detailData"] }]
  )
);
