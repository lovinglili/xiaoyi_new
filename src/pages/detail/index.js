import React, { Component } from "react";
import { Detail, DetailTop, DetailBottom, GoodTitle, GoodPrice, BusinessMessage, ProductDetail } from "./styles.js";

import { Layout, Card, Col, Row, Pagination, Icon, Menu } from "antd";
import HeaderContainer from "@c/Header";
import { Category, ContentCon, DetailCardContainer } from "../category/styles.js";

const gridStyle = {
  width: '50%',
  textAlign: 'center',
};
const { Meta } = Card;
const list = [
  {
    title: "华为手机",
    goodId: 1,
    desc: "全新",
    nickname: "微微一笑很倾城123",
    price: "99.00",
    originalPrice: "1999.00",
    pics: ["https://www.paipai.com//static/img/entrance.018e382.png"]
  },
  {
    title: "华为手机",
    goodId: 2,
    desc: "全新",
    nickname: "微微一笑很倾城123",
    price: "99.00",
    originalPrice: "1999.00",
    pics: ["https://www.paipai.com//static/img/entrance.018e382.png"]
  },
  {
    title: "华为手机",
    goodId: 3,
    desc: "全新",
    nickname: "微微一笑很倾城123",
    price: "99.00",
    originalPrice: "1999.00",
    pics: ["https://www.paipai.com//static/img/entrance.018e382.png"]
  },
  {
    title: "华为手机",
    goodId: 4,
    desc: "全新",
    nickname: "微微一笑很倾城123",
    price: "99.00",
    originalPrice: "1999.00",
    pics: ["https://www.paipai.com//static/img/entrance.018e382.png"]
  },
  {
    title: "华为手机",
    goodId: 5,
    desc: "全新",
    nickname: "微微一笑很倾城123",
    price: "99.00",
    originalPrice: "1999.00",
    pics: ["https://www.paipai.com//static/img/entrance.018e382.png"]
  }
];

// 登录
class DetailContainer extends Component {

  render() {
    return (
      <Detail>
        <Layout.Header>
          <HeaderContainer />
        </Layout.Header>
        <DetailTop>
          <Card title="Card Title">
            <Card.Grid style={gridStyle}>
              <img
                src="https://img10.360buyimg.com/n1/s630x630_jfs/t3175/329/4510007458/55264/d97fae3a/584cea93N78f99c66.jpg"
                style={{}}
                alt=""
              />
            </Card.Grid>
            <Card.Grid style={gridStyle}>
            <div class="good-describe">
                <GoodTitle>
                  <img src="" />
                  【京东智能电视】KKTV  U50F1 康佳  50英寸4K超高清36核HDR 网络电视 人工智能语音 液晶电视 （黑色+银色）
                </GoodTitle>
                <GoodPrice>
                  <div class="sale-price">
                    <div class="text">售卖价</div>
                    <div class="price">
                      <span>￥</span>1400
                  </div>
                  </div>
                  <div class="production-price">
                    <div class="text">原价</div>
                    <div class="price"><span>￥</span>2199</div>
                  </div>
                  <div class="sale-address">
                    <div class="text">发布地</div>
                    <div class="price">青岛市 胶州市</div>
                  </div>
                  <div class="label"><span>包邮</span> <span>商品全新</span> <span>有发票</span></div>
                </GoodPrice>
                <BusinessMessage>
                  <div class="contact">
                    <div class="contact-seller"><span class="phone-number">立即购买</span></div>
                  </div>
                </BusinessMessage>
              </div>
            </Card.Grid>
          </Card>
          <Card bordered={false} style={{ width: 300 }}>
            <ProductDetail>
              <div class="title">
                <img src="/static/img/title.8dfb8a8.png" width="120" height="27" />
              </div>
              <div class="con">
                <p>50吋4K高性价比- U50F1</p>
              </div>
              <div class="img-info">
                <div class="commonImg">
                  <ul class="clearfix">
                    <li>
                      <img height="630" width="630" class="bigImg" data-src="//img10.360buyimg.com/n1/s630x630_jfs/t1/23955/34/7576/71317/5c6d15a7E3ceec520/e504960a59a1df3f.jpg" src="//img10.360buyimg.com/n1/s630x630_jfs/t1/23955/34/7576/71317/5c6d15a7E3ceec520/e504960a59a1df3f.jpg" lazy="loaded" />
                    </li>
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

export default DetailContainer;
