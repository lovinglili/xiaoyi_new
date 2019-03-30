import React, { Component } from "react";
import { SubmitOrder, BusinessMessage } from "./styles.js";
import { Link, withRouter } from "react-router-dom";
import connect from "@connect";
import { Layout, Card, Modal, Button, Cascader, Col, Row, Pagination, Icon, Menu } from "antd";
import HeaderContainer from "@c/Header";
import createActionDetail from "../../store/detail/actionCreators";
import createActionLoginIn from "../../store/header/actionCreators";

const {
  Header, Footer, Sider, Content,
} = Layout;

connect.addActions({
  detail: createActionDetail,
  header: createActionLoginIn
});

// 登录
class SubmitOrderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      provinceId: '650000',
      cityId: '650400',
      district: '650421',
    }
  }
  state = {
    visible: false,
    text: 'Unselect',
   }
  componentDidMount() {
    this.getDetailTo();
    this.getAddressTo();
  }
  // 调用获取地址
  getAddressTo = () => {
    const { loginIn: { userInfo = {} } } = this.props;
    const { nickName } = userInfo;
    const { detail_actions } = this.props;
    detail_actions.getAddress(nickName, this.toConsole);
  }

  getDetailTo = () => {
    const { detail_actions, match } = this.props;
    let goodId = match.params.goodId ? (match.params.goodId).replace(/^:/,'') : ''; // 获取路径中的goodId
    detail_actions.getDetail(goodId, this.toConsole);
  }

  getCitiesTo = () => {
    const { detail_actions } = this.props;
    detail_actions.getCities(this.toConsole);
  }

  addAddressTo = () => {
    const { detail_actions } = this.props;
    const params = {
      privanceId: this.state.privanceId, // "privanceId":12,
      privanceName: "北京", // "privanceName":"北京",
      cityId: this.state.cityId, // "cityId":12,
      cityName: "密云区", // "cityName":"密云区" ,
      more: "xx街道xx小区" // "more":"xx街道xx小区"
    }
    detail_actions.addAddress (params, this.getAddressTo );
  }

  addOrderTo = () => {
    const { loginIn: { userInfo = {} } } = this.props;
    const { nickName } = userInfo; 
    const { detail_actions, detail, match } = this.props;
    let goodId = match.params.goodId ? (match.params.goodId).replace(/^:/,'') : ''; // 获取路径中的goodId
    const params = {
      nickName: nickName,
      addressId:123,
      goodId: goodId // '所要购买的商品的id',
    }
    detail_actions.addOrder (params, this.toConsole);
  }
  toConsole() {
    console.log(2333);
  }

  showModal = () => {
    this.getCitiesTo();
    this.setState({
      visible: true,
    });
  }


  handleOk = (e) => {
    console.log(e);
    this.addAddressTo();
    this.setState({
      visible: false,
    });
  }

  onChange(value) {
    console.log(value);
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleChange = (value) => { // 获取到省id和市id
    console.log('哈哈哈哈哈哈哈哈哈哈：', value)
    this.setState({
      provinceId: value[0],
      cityId: value[1],
    });
  }

  // 获取该商品的id并跳转到个人中心的页面
  handleCardClick = () => { 
    this.addOrderTo();
    this.props.history.push({ pathname: `/myself` });
  };

  render() {
    const { loginIn: { userInfo = {} } } = this.props;
    const { nickName } = userInfo;
    const { detail } = this.props;
    console.log("render---this.props:", this.props, detail.detailData, detail.detailData.pics ? detail.detailData.pics[0] : "");
    let myDetailData = Object.keys(detail.detailData).length !== 0 ? detail.detailData : {};
    let myPics = detail.detailData.pics ? detail.detailData.pics : [];
    let data = detail.citiesList ? detail.citiesList.list : [];
    let myAddressList = detail.addressList.length > 0 ? detail.addressList : [];
    let myAddressList2 = myAddressList.length > 0  ? myAddressList[0] : [];
    console.log('data l啦啦啦赶快撒娇说：', data, myAddressList, myAddressList2);
    return (
      <SubmitOrder>
        <Layout>
          <Header>
            <HeaderContainer />
          </Header>
          <Content>
            <Card>
              <Card title="收货信息">
                {(myAddressList === []) ? (
                  <p>您的收货地址为空，点击 <Button type="primary" onClick={this.showModal}>新增收货地址</Button></p>
                 ) : (
                  <p>
                    {myAddressList.map(item => (
                      <p>地址：<span>{item.privanceName}-{item.cityName}-{item.more}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    ))}
                    <Button type="primary" onClick={this.showModal}>新增收货地址</Button>
                  </p>
                 )}
              </Card>
              <Card
                title="商品信息"
              >
                <img
                  src={myPics[0]}
                  style={{ width: 200 }}
                  alt=""
                />
                <span>{myDetailData.title}</span>
              </Card>
            </Card>
            <Modal
              title="新增收货地址"
              width={820}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
             <Cascader
               fieldNames={{ label: 'name', value: 'id', children: 'children' }}
               options={data}
               onChange={this.handleChange}
               placeholder="Please select" />
            </Modal>
          </Content>
          <Footer>
            <div>
              <div>
                <span>应付金额：
                  <span style={{
                    fontFamily: "jdzh-r",
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#ff3434"
                  }}>
                   ¥{myDetailData.price}
                  </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span>地址：<span>{myAddressList2.privanceName}-{myAddressList2.cityName}-{myAddressList2.more}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>收件人：<span>{nickName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
            </div>
            <BusinessMessage>
              <div className="contact">
                <div className="contact-seller">
                  <span className="phone-number"
                    onClick={() => this.handleCardClick()}
                  >
                    提交订单
                  </span>
                </div>
              </div>
            </BusinessMessage>
          </Footer>
        </Layout>
      </SubmitOrder>
    );
  }
}

// export default SubmitOrderContainer;
export default withRouter(
  connect(
    SubmitOrderContainer,
    [{ name: "detail", state: ["detailData"] },
    { name: "loginIn", state: ["loginInData"] }]
  )
);
