import React, { Component } from "react";
import { Carousel, Radio, Layout, Row, Col } from "antd";
import connect from "@connect";
import { withRouter } from "react-router-dom";
import HeaderContainer from "@c/Header";

import {
  HomeContainers,
  ContentContainer,
  XiaoYiStyle,
  BuyContainer
} from "./styles.js";

import createAction from "../../store/home/actionCreators";
connect.addActions({
  home: createAction
});

class HomeContainer extends Component {
  state = {
    mode: "sold"
  };
  componentDidMount() {
    // 获取分类信息
  }

  handleModeChange = e => {
    const mode = e.target.value;
    this.setState({ mode });
  };

  onClick = () => {};

  // 搜索商品  模糊匹配分类名称
  handleChange = () => {};

  render() {
    const { mode } = this.state;
    return (
      <XiaoYiStyle>
        <Layout>
          <Layout.Header>
            <HeaderContainer />
          </Layout.Header>
          <Layout.Content>
            <HomeContainers>
              <div style={{height:80,border:'1px solid #eee',width:'60%',margin:'0 auto 24px auto'}}>
                  
              </div>
              <Row gutter={16}>
                <Col span={24}>
                  <Carousel autoplay ref={el => (this.slider = el)}>
                    <div key={1}>
                      <img
                        src="https://www.paipai.com/static/img/banner1.57aeb9e.png"
                        style={{ height: "250px", width: "100%" }}
                        alt=""
                      />
                    </div>
                    <div key={2}>
                      <img
                        src="https://www.paipai.com/static/img/banner2.def6353.png"
                        style={{ height: "250px", width: "100%" }}
                        alt=""
                      />
                    </div>
                    <div key={3}>
                      <img
                        src="https://www.paipai.com/static/img/banner3.0861f56.png"
                        style={{ height: "250px", width: "100%" }}
                        alt=""
                      />
                    </div>
                    <div key={4}>
                      <img
                        src="https://www.paipai.com/static/img/banner1.57aeb9e.png"
                        style={{ height: "250px", width: "100%" }}
                        alt=""
                      />
                    </div>
                  </Carousel>
                  <div style={{ marginTop: 24 }}>
                    <img
                      src="https://www.paipai.com/static/img/title.a1fd4a8.png"
                      height="61"
                      width="161"
                      alt=""
                    />
                  </div>
                  <ContentContainer>
                    <Radio.Group
                      onChange={this.handleModeChange}
                      value={mode}
                      style={{ marginBottom: 8 }}
                    >
                      <Radio.Button value="sold">卖</Radio.Button>
                      <Radio.Button value="buy">买</Radio.Button>
                    </Radio.Group>

                    {mode === "buy" && <div>买</div>}
                    {mode === "sold" && (
                      <BuyContainer>
                        <ul>
                          <li>
                            <a>
                              <img
                                src="https://www.paipai.com/static/img/entrance1.bcd00fa.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a>
                              <img
                                src="https://www.paipai.com/static/img/entrance2.a90b59d.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a>
                              <img
                                src="https://www.paipai.com/static/img/entrance3.1158af2.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a>
                              <img
                                src="https://www.paipai.com/static/img/entrance4.079adee.png"
                                alt=""
                              />
                            </a>
                          </li>
                        </ul>
                      </BuyContainer>
                    )}
                  </ContentContainer>
                </Col>
              </Row>
            </HomeContainers>
          </Layout.Content>
        </Layout>
      </XiaoYiStyle>
    );
  }
}

// export default HomeContainer;
export default withRouter(
  connect(
    HomeContainer,
    [{ name: "home", state: ["list"] }]
  )
);
