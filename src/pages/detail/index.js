import React, { Component } from "react";
import { Detail, DetailTop, DetailBottom, GoodTitle, GoodPrice, BusinessMessage, ProductDetail } from "./styles.js";
import { Link,withRouter } from "react-router-dom";
import connect from "@connect";
import { Layout, Card, Col, Row, Pagination, Icon, Menu } from "antd";
import HeaderContainer from "@c/Header";
import { Category, ContentCon, DetailCardContainer } from "../category/styles.js";
import createActionDetail from "../../store/detail/actionCreators";

connect.addActions({
  detail: createActionDetail
});

const gridStyle = {
  width: '50%',
  textAlign: 'center',
};

class DetailContainer extends Component {

  componentDidMount(){
    const {detail_actions, detail, match}=this.props;
    let goodId = match.params.goodId ? (match.params.goodId).replace(/^:/,'') : ''; // 获取路径中的goodId
    detail_actions.getDetail(goodId, this.toConsole);
    // console.log("this.props:", this.props, detail.detailData);
    // const rememberUser= JSON.parse(localStorage.getItem("user"));
    // this.setState({
    //   assignUser:rememberUser
    // })
  }
  toConsole() {
    console.log(2333);
  }

  // 获取该商品的id并跳转到提交订单的页面
  handleCardClick = id => {
    //   renderOtherData(path,val){
    //     this.props.history.push({pathname:"/home/albums/"+path,state:val});
    //     this.props.unshow();
    //     this.props.albums_actions.getTypeId(path);
    //     this.props.albums_actions.getListSound(path,1);
    // }
    this.props.history.push({ pathname: `/submitOrder:${id}` });
  };

  render() {
    const { detail, match}=this.props;
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
                style={{}}
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
                <BusinessMessage>
                  <div className="contact">
                    <div className="contact-seller">
                      <span className="phone-number"
                        onClick={() => this.handleCardClick(goodId)}
                      >
                        立即购买
                      </span>
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
      </Detail>
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
