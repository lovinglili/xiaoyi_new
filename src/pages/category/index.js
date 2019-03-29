import React, { PureComponent } from "react";
import { Layout, Card, Pagination, Icon, Menu, Empty } from "antd";
import HeaderContainer from "@c/Header";
import { withRouter } from "react-router-dom";
import connect from "@connect";
import { Category, ContentCon, DetailCardContainer } from "./styles.js";

const { Meta } = Card;
class CategoryContainer extends PureComponent {
  state = {
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0
    }, // 分页的参数
    sort: true, // 从高到低
    allList: [], // 所有的数据
    usedList: [], // 存放满足条件的数据
    currentList: [] // 存放当前页的容器列表
  };
  componentDidMount() {}

  // 搜索
  handleSearch = value => {
    const { allList } = this.state;
    const arr = allList.filter(
      item =>
        item.name.toLocaleUpperCase().indexOf(value.toLocaleUpperCase()) !== -1
    );
    const list = arr.slice(0, 10);
    this.setState({
      usedList: arr,
      currentList: list,
      pagination: {
        current: 1,
        pageSize: 10,
        total: arr.length
      }
    });
  };

  // pagination
  handlePaginationChange = page => {
    const { usedList } = this.state;
    console.log(usedList)
    const startIndex = (page - 1) * 10;
    const list = usedList.slice(startIndex, startIndex + 10);
    this.setState({
      currentList: list,
      pagination: {
        current: page,
        pageSize: 10,
        total: usedList.length
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    // 判断list不为空的时候就setState,前端分页和搜索；
    const {
      header: {
        listData: { list=[] }
      },
      history
    } = nextProps;
    const { allList } = this.state;
    const {
      location: {
        state: { name = "" }
      }
    } = history;
    if (allList !== list) {
      this.setState({ allList: list }, () => {
        const arr = this.state.allList.filter(
          item =>
            item.name.toLocaleUpperCase().indexOf(name.toLocaleUpperCase()) !==
            -1
        );
        const listNow = arr.slice(0, 10);
        this.setState({
          usedList: arr,
          currentList: listNow,
          pagination: {
            current: 1,
            pageSize: 1,
            total: arr.length
          }
        });
      });
    }
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
        state: { name }
      }
    } = history;
    const { pagination, sort, currentList, allList } = this.state;
    return (
      <Category>
        <Layout>
          <Layout.Header>
            <HeaderContainer handleSearch={this.handleSearch} />
          </Layout.Header>
          <ContentCon>
            <Card title={name} bordered={false}>
              <Menu defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">综合</Menu.Item>
                <Menu.Item key="2" onClick={this.handleSort}>
                  价格&nbsp;
                  {sort ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}
                </Menu.Item>
              </Menu>
              <Pagination
                simple
                { ...pagination }
                onChange={this.handlePaginationChange}
              />
            </Card>
            <DetailCardContainer>
              {currentList.length !== 0 &&
                currentList.map(item => (
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
              {currentList.length === 0 && (
                <Empty image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original" />
              )}
            </DetailCardContainer>
          </ContentCon>
        </Layout>
      </Category>
    );
  }
}

export default withRouter(
  connect(
    CategoryContainer,
    [{ name: "header", state: ["listData"] }]
  )
);
