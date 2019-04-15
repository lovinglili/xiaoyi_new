import React, { Component } from "react";
import { Detail, DetailTop, DetailBottom, GoodTitle, GoodPrice, BusinessMessage, ProductDetail } from "./styles.js";
import { Link,withRouter } from "react-router-dom";
import connect from "@connect";
import { Layout, Card, Col, Row, Pagination, Icon, Menu } from "antd";
import HeaderContainer from "@c/Header";
import FooterContainer from "@c/Footer";
import { Category, ContentCon, DetailCardContainer } from "../category/styles.js";
import createActionDetail from "../../store/detail/actionCreators";

connect.addActions({
  detail: createActionDetail
});

const gridStyle = {
  width: '50%',
  textAlign: 'center',
  overflow: 'hidden'
};

class DetailContainer extends Component {

  componentDidMount(){
    const {detail_actions, detail, match}=this.props;
    let goodId = match.params.goodId ? (match.params.goodId).replace(/^:/,'') : ''; // 获取路径中的goodId
    detail_actions.getDetail(goodId,()=>{});
  }


  // 获取该商品的id并跳转到提交订单的页面
  handleCardClick = id => {
    this.props.history.push({ pathname: `/submitOrder:${id}` });
  };

  render() {
    const { loginIn: { userInfo = {} }, detail,match } = this.props;
    const { nickName } = userInfo;
    let goodId = match.params.goodId ? (match.params.goodId).replace(/^:/,'') : ''; // 获取路径中的goodId
    let myDetailData = Object.keys(detail.detailData).length !== 0 ? detail.detailData : {};
    let myPics = detail.detailData.pics ? detail.detailData.pics : [];
    return (
      <Detail>
        <Layout.Header>
          <HeaderContainer />
        </Layout.Header>
        <DetailTop>
          <Card>
            <Card.Grid style={gridStyle}>
              <img
                src={myPics[0]}
                alt=""
              />
            </Card.Grid>
            <Card.Grid style={gridStyle}>
            <div className="good-describe">
                <GoodTitle>
                  <img src="" />
                  {myDetailData.title}
                </GoodTitle>
                <GoodPrice>
                  <div className="sale-price">
                    <div className="text">售卖价</div>
                    <div className="price">
                      <span>￥</span>{myDetailData.price}
                  </div>
                  </div>
                  <div className="production-price">
                    <div className="text">原价</div>
                    <div className="price"><span>￥</span>2199</div>
                  </div>
                  <div className="sale-address">
                    <div className="text">发布地</div>
                    <div className="price">{myDetailData.cityName}</div>
                  </div>
                  <div className="label">
                    <div className="text">描述</div>
                    <div className="price">{myDetailData.desc}</div>
                  </div>
                </GoodPrice>
                <BusinessMessage  status={myDetailData.status} nickName={myDetailData.nickName} userName={nickName}>
                  <div className="contact">
                    <div className="contact-seller">
                    {console.log(myDetailData.status,"gggg")}
                      {(myDetailData.status !==0 || myDetailData.nickName===nickName)?( <span className="phone-number"
                     style={{cursor:'pointer'}} >
                        立即购买
                      </span>):( <span className="phone-number"
                      style={{cursor:'pointer'}}
                    onClick={() => this.handleCardClick(goodId)}
                  >
                    立即购买
                  </span>)}
                    </div>
                  </div>
                </BusinessMessage>
              </div>
            </Card.Grid>
          </Card>
          <Card bordered={false} style={{ width: 300 }}>
            <ProductDetail>
              <div className="title">
                <img src="https://www.paipai.com/static/img/title.8dfb8a8.png" width="120" height="27" />
              </div>
              <div className="con">
                <p>{myDetailData.desc}</p>
              </div>
              <div className="img-info">
                <div className="commonImg">
                  <ul className="clearfix">
                    {myPics.map((pics, index) => (
                      <li key={index}>
                        <img height="630" width="630" className="bigImg" src={pics} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ProductDetail>
          </Card>
        </DetailTop>
        <FooterContainer/>
      </Detail>
    );
  }
}

// export default DetailContainer;
export default withRouter(
  connect(
    DetailContainer,
    [{ name: "detail", state: ["detailData"] },{ name: "loginIn" }],

  )
);
