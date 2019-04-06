import React, { Component } from "react";
import { Carousel, Radio, Layout, Row, Col, Card } from "antd";
import connect from "@connect";
import { withRouter } from "react-router-dom";
import HeaderContainer from "@c/Header";
import {Banner1,Banner2} from "@s"

import {
  HomeContainers,
  ContentContainer,
  XiaoYiStyle,
  BuyContainer,
  RedBlock,
  ImgWrapper
} from "./styles.js";

import createAction from "../../store/home/actionCreators";
connect.addActions({
  home: createAction
});

class HomeContainer extends Component {
  state = {
    mode: "sold",
    allList: []
  };
  componentDidMount() {
    // 获取分类信息
  }

  handleModeChange = e => {
    const mode = e.target.value;
    this.setState({ mode });
  };

  onClick = () => { };
  componentWillReceiveProps(nextProps) {
    const { header: { listData: { list } } } = nextProps;
    const { allList } = this.state;
    if (allList !== list) {
      this.setState({ allList: list })
    }

  }

  // 将数据分三类
  handleAllList = () => {
    const { allList } = this.state;
    let categoryIds = [];
    let threeDataList = [];
    if (allList.length !== 0) {
      allList.forEach(item => {
        categoryIds.push(item.categoryId)
      })
      const noRepeatIds = categoryIds.filter((element, index, self) => {
        return self.indexOf(element) === index;
      });
      noRepeatIds.forEach((idItem, index) => {
        threeDataList[index] = allList.filter(item => (item.categoryId === idItem)).slice(0, 3)
      })
      return (<div>
        {threeDataList.map((item, index) => (
          <Card style={{ width: "100%", margin: '8px 0 16px 0' }} key={index} hoverable>
            <RedBlock title={item[0].categoryTitle}></RedBlock>
            <Row gutter={16}>
              {item.map((colItem, colIndex) => (
                <Col span={8} key={colIndex}>
                  <div onClick={()=>{this.props.history.push(`/detail:${colItem.goodId}`)}}>
                    <ImgWrapper >
                      <img src={colItem.pics[0]} alt='' width='100%'></img>
                    </ImgWrapper>
                    <p style={{ marginBottom: 0 }}>{colItem.title}</p>
                    <p style={{ marginBottom: 0 }}>{colItem.desc}</p>
                    <p style={{ marginBottom: 0 }}><span style={{ color: 'red', paddingRight: 24 }}>{colItem.price}</span>
                      <span style={{ textDecoration: 'line-through' }}>{colItem.originalPrice}</span>
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        ))}

      </div>)
    }
  }

  // 点击图片进行发布或者登陆
  handleImgClick = () => {
    const { loginIn: { loginInData: { isAssign } } } = this.props;
    if (isAssign) {
      this.props.history.push({ pathname: '/publish' });
    } else {
      this.props.history.push({ pathname: '/loginIn' });
    }

  }

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

              <Row gutter={16}>
                <Col span={24}>
                  <Carousel autoplay ref={el => (this.slider = el)}>
                    <div key={1}>

                      <img
                        src={Banner1}
                        style={{ height: "300px", width: "100%" }}
                        alt=""
                      />
                    </div>
                    <div key={2}>
                      <img
                        src={Banner2}
                        style={{ height: "300px", width: "100%" }}
                        alt=""
                      />
                    </div>
                  </Carousel>
                  <div >
                    <ContentContainer>
                      <Radio.Group
                        onChange={this.handleModeChange}
                        value={mode}
                        style={{ marginBottom: 8 }}
                      >
                        <Radio.Button value="sold">卖</Radio.Button>
                        <Radio.Button value="buy">买</Radio.Button>
                      </Radio.Group>

                      {mode === "buy" && <div>
                      <p  style={{margin:'10px auto',color:"#df9c9c"}}>买好物，花最少的钱买最合适的物品</p>
                        {this.handleAllList()}
                      </div>}
                      {mode === "sold" && (
                        <BuyContainer>
                      <p style={{margin:'10px auto',color:"#df9c9c"}}>卖闲置，让你的物品物尽其用</p>

                          <ul>
                            <li>
                              <a >
                                <img
                                  onClick={this.handleImgClick}
                                  src="https://www.paipai.com/static/img/entrance1.bcd00fa.png"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a>
                                <img
                                  onClick={this.handleImgClick}
                                  src="https://www.paipai.com/static/img/entrance2.a90b59d.png"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a>
                                <img
                                  onClick={this.handleImgClick}
                                  src="https://www.paipai.com/static/img/entrance3.1158af2.png"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a>
                                <img
                                  onClick={this.handleImgClick}
                                  src="https://www.paipai.com/static/img/entrance4.079adee.png"
                                  alt=""
                                />
                              </a>
                            </li>
                          </ul>
                        </BuyContainer>
                      )}
                    </ContentContainer>
                  </div>

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
    [{ name: "header" }, { name: "loginIn" }]
  )
);
