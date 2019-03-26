import React, { Component } from "react";
import { Layout, Card, Pagination, Icon, Menu } from "antd";
import HeaderContainer from "@c/Header";
import { withRouter } from "react-router-dom";
import connect from "@connect";
import { Category, ContentCon, DetailCardContainer } from "./styles.js";

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
class CategoryContainer extends Component {
  state = {
    current: 1, // 分页的当前页
    total: 0, // 数组的条数
    sort: true // 从高到低
  };
  componentDidMount() {
    const { history } = this.props;
    const {
      location: {
        state: { goodName }
      }
    } = history;
    // 数据请求 dispatch
    this.setState({
      current: 1,
      total: list.length
    });
  }

  // 获取该商品的详情并跳转到详情的页面
  handleCardClick = id => {
    //   renderOtherData(path,val){
    //     this.props.history.push({pathname:"/home/albums/"+path,state:val});
    //     this.props.unshow();
    //     this.props.albums_actions.getTypeId(path);
    //     this.props.albums_actions.getListSound(path,1);
    // }
    this.props.history.push({ pathname: `/detail:${id}` });
  };

  // 排序
  handleSort = () => {
    const { sort } = this.state;
    this.setState({
      sort: !sort
    });
  };

  render() {
    const { history } = this.props;
    const {
      location: {
        state: { goodName }
      }
    } = history;
    const { current, total, sort } = this.state;
    return (
      <Category>
        <Layout>
          <Layout.Header>
            <HeaderContainer />
          </Layout.Header>
          <ContentCon>
            <Card title={goodName} bordered={false}>
              {/* <ul>
             <li>综合</li>
             <li onClick={this.handleSort}>价格&nbsp;{sort ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}</li>
             <li>综合</li>
           </ul> */}
              <Menu defaultSelectedKeys={['1']}>
                <Menu.Item key='1'>综合</Menu.Item>
                <Menu.Item key='2' onClick={this.handleSort}>价格&nbsp;{sort ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}</Menu.Item>
                <Menu.Item key='3' >菜单项</Menu.Item>
              </Menu>
              <Pagination
                simple
                current={current}
                total={total}
                pageSize={20}
              />
            </Card>
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
      </Category>
    );
  }
}

export default withRouter(connect(CategoryContainer));
