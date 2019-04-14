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
      pageSize:9 ,
      total: 0
    }, // 分页的参数
    sorts: true, // 从高到低
    zongHeList:[], // 综合的数据，按照数据库存储的方式
    allList: [], // 所有的数据
    usedList: [], // 存放满足条件的数据
    currentList: [] // 存放当前页的容器列表
  };
  componentDidMount() {}

  // 搜索
  handleSearch = (value,type) => {
    const { allList } = this.state;
    const arr = allList.filter(
      item =>
      { 
        if(type==='head'){
          return item.name.toLocaleUpperCase().indexOf(value.toLocaleUpperCase()) !==-1
        }
        if(type==='input'){
         return item.title.toLocaleUpperCase().indexOf(value.toLocaleUpperCase()) !==-1
        }
   }
    );
    const list = arr.slice(0, 9);
    this.setState({
      usedList: arr,
      currentList: list,
      pagination: {
        current: 1,
        pageSize: 9,
        total: arr.length
      }
    });
  };

  // pagination
  handlePaginationChange = page => {
    const { usedList } = this.state;
    const startIndex = (page - 1) * 9;
    const list = usedList.slice(startIndex, startIndex + 9);
    this.setState({
      currentList: list,
      pagination: {
        current: page,
        pageSize: 9,
        total: usedList.length
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    // 判断list不为空的时候就setState,前端分页和搜索；
    const {
      header: {
        listData
      },
      history
    } = nextProps;
    const { allList } = this.state;
    const {
      location: {
        state: { name = "" ,type=''}
      }
    } = history;
    if (allList !== listData) {
      this.setState({ allList: listData }, () => {
        const arr = this.state.allList.filter(
          item =>
           { 
             if(type==='head'){
               return item.name.toLocaleUpperCase().indexOf(name.toLocaleUpperCase()) !==-1
             }
             if(type==='input'){
              return item.title.toLocaleUpperCase().indexOf(name.toLocaleUpperCase()) !==-1
             }
        }
        );
        const listNow = arr.slice(0, 9);
        this.setState({
          usedList: arr,
          currentList: listNow,
          zongHeList:listNow,
          pagination: {
            current: 1,
            pageSize: 9,
            total: arr.length
          }
        });
      });
    }
  }

  // 获取该商品的详情并跳转到详情的页面
  handleCardClick = id => {
    this.props.history.push({ pathname: `/detail:${id}` });
  };

  // 综合
  handleNoSort=()=>{
    const {zongHeList}=this.state;
    this.setState({currentList:zongHeList})
  }
  // 排序 默认升序
  handleSort = () => {
    const { sorts ,currentList} = this.state;
    if(sorts){ // 降序排列
      currentList.sort(this.compareUp('price'))
    }else{
      currentList.sort(this.compareDown('price'))
    }
    this.setState({
      sorts: !sorts,
      currentList
    });
  };

   compareDown=(property)=>{
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}

compareUp=(property)=>{
  return function(a,b){
      var value1 = a[property];
      var value2 = b[property];
      return value2-value1;
  }
}

  render() {
    const { history } = this.props;
    const {
      location: {
        state: { name }
      }
    } = history;
    const { pagination, sorts, currentList } = this.state;
    return (
      <Category>
        <Layout>
          <Layout.Header>
            <HeaderContainer handleSearch={this.handleSearch} />
          </Layout.Header>
          <ContentCon>
            <Card title={name} bordered={false}>
              <Menu defaultSelectedKeys={["1"]}>
                <Menu.Item key="1" onClick={this.handleNoSort}>综合</Menu.Item>
                <Menu.Item key="2" onClick={this.handleSort}>
                  价格&nbsp;
                  {sorts ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}
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
                    key={item._id}
                  >
                    <Card
                      hoverable
                      onClick={() => this.handleCardClick(item._id)}
                      title={<span>{item.nickName}</span>}
                      style={{ width: 260 }}
                      cover={
                        <img style={{width: 258,height: 258}}
                          alt="example"
                          src={item.pics[0]}
                        />
                      }
                    >
                      <Meta
                        title={item.title}
                        description={
                          <div>
                            <p style={{fontSize:'12px'}}>{item.desc}</p>
                            <div>
                              <span
                                style={{
                                  marginRight: 16,
                                  fontSize: "18px",
                                  fontWeight: 600,
                                  color: "red"
                                }}
                              >
                                ￥{item.price}
                              </span>
                              <span
                                style={{
                                  textDecoration: "line-through",
                                  fontWeight: 400
                                }}
                              >
                                ￥{item.originPrice}
                              </span>
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </div>
                ))}
              {currentList.length === 0 && (
                <div style={{minHeight:'calc(100vh - 213px)'}}>

                  <Empty image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original" />
                </div>
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
