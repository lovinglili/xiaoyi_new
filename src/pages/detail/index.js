import React, { Component } from "react";
import { Detail, DetailTop, DetailBottom } from "./styles.js";

import { Layout, Card, Col, Row, Pagination, Icon, Menu } from "antd";
import HeaderContainer from "@c/Header";
import { Category, ContentCon, DetailCardContainer } from "../category/styles.js";
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
          {/* <Card title="Card title" bordered={false}>
            <div key={1}>
              <img
                src="https://img10.360buyimg.com/n1/s630x630_jfs/t3175/329/4510007458/55264/d97fae3a/584cea93N78f99c66.jpg"
                style={{}}
                alt=""
              />
            </div>
          </Card>
          <Card title="Card title" bordered={false}>
            <div>
              详细信息   
            </div>
          </Card> */}
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Card title" style={{ width: 500, height: 600 }} bordered={false}>Card content</Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" style={{ width: 500, height: 600 }} bordered={false}>Card content</Card>
            </Col>
            {/* <Col span={8}>
              <Card title="Card title" bordered={false}>Card content</Card>
            </Col> */}
          </Row>
        </DetailTop>
        {/* <DetailBottom>
          <div key={1}>
            <img
              src="https://img10.360buyimg.com/n1/s630x630_jfs/t3175/329/4510007458/55264/d97fae3a/584cea93N78f99c66.jpg"
              style={{}}
              alt=""
            />
          </div>
          <div key={1}>
            <img
              src="https://img10.360buyimg.com/n1/s630x630_jfs/t3175/329/4510007458/55264/d97fae3a/584cea93N78f99c66.jpg"
              style={{}}
              alt=""
            />
          </div>
        </DetailBottom>
        */}
        {/* <Category>
          <Layout>
            <Layout.Header>
              <HeaderContainer />
            </Layout.Header>
            <ContentCon>
              <DetailCardContainer>
                {list.map(item => (
                  <div
                    style={{ display: "inline-block", marginTop: 24 }}
                    key={item.goodId}
                  >
                    <Card
                      hoverable
                      onClick={() => this.handleCardClick(item.goodId)}
                      title={<span>{item.nickname}</span>}
                      style={{ width: 260 }}
                      cover={
                        <img
                          alt="example"
                          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        />
                      }
                    >
                      <Meta
                        title={item.title}
                        description={
                          <div>
                            <p>{item.desc}</p>
                            <div>
                              <span
                                style={{
                                  marginRight: 16,
                                  fontSize: "18px",
                                  fontWeight: 600,
                                  color: "red"
                                }}
                              >
                                {item.price}
                              </span>
                              <span
                                style={{
                                  textDecoration: "line-through",
                                  fontWeight: 400
                                }}
                              >
                                {item.originalPrice}
                              </span>
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </div>
                ))}
              </DetailCardContainer>
            </ContentCon>
          </Layout>
        </Category> */}
      </Detail>
    );
  }
}

export default DetailContainer;
