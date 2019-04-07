import React, { Component } from "react";
import { MySelf } from "./styles.js";
import { Layout,List, Avatar, Tabs, Card, Modal, Button, Cascader, Col, Row, Pagination, Icon, Menu } from "antd";
import HeaderContainer from "@c/Header";
import connect from "@connect";
import { Link, withRouter } from "react-router-dom";
import createActionDetail from "../../store/detail/actionCreators";
import createActionLoginIn from "../../store/header/actionCreators";
import uuid from "uuid/v1";
import _ from 'lodash';

const TabPane = Tabs.TabPane;
const {
  Header, Footer, Sider, Content,
} = Layout;
connect.addActions({
    detail: createActionDetail,
    header: createActionLoginIn
});
const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
class MySelfContainer extends Component {
    state = {
        orderList: []
    }
    componentDidMount() {
        // this.getDetailTo();
        this.setState({
            orderList: localStorage.goods,
        });
    }

    getDetailTo = () => {
        const { detail_actions, match } = this.props;
        let goodId = match.params.goodId ? (match.params.goodId).replace(/^:/,'') : ''; // 获取路径中的goodId
        detail_actions.getDetail(goodId, this.toConsole);
    }
    toConsole() {
        console.log(2333);
    }
    callback(key) {
        console.log(key);
    }
    render(){
<<<<<<< HEAD
        console.log(localStorage.goods,"sdfdsf") 
        let orderList = JSON.parse(localStorage.goods); // 所有订单
        let notSellOrderList =  _.filter(orderList, item => item.status === "0"); // 未卖出
        let soldOrderList =  _.filter(orderList, item => item.status === "1"); // 已卖出
        let soldOutOrderList =  _.filter(orderList, item => item.status === "2"); // 已下架
=======
        const { header } = this.props;
        if(header.listData === {}) return;
        let orderList = header.listData;
        console.log('23', this.props, orderList)
        // let orderList = JSON.parse(localStorage.goods); // 所有订单
        let notSellOrderList =  _.filter(orderList, item => item.status === 0); // 未卖出
        let soldOrderList =  _.filter(orderList, item => item.status === 1); // 已卖出
        let soldOutOrderList =  _.filter(orderList, item => item.status === 2); // 已下架
        console.log('orderList/this.state.orderList.pics', orderList, soldOrderList, soldOutOrderList);
>>>>>>> d28cf21d00ca4f6a4b1d1e830da3b12569a4db40
        return(
            <MySelf>
                <Layout>
                    <Header>
                        <HeaderContainer />
                    </Header>
                    <Content>
                        个人中心
                        <Card>
                            <Avatar size={164} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <span>昵称：</span>
                        </Card>
                        <Card title="订单">
                            {orderList.length !== 0 && Array.isArray(orderList) &&
                             orderList.map((item, index) => (
                                <Card key={uuid()}
                                    title="商品"
                                >
                                    <img
                                        src={item.pics[0]}
                                        style={{ width: 100 }}
                                        alt=""/>
                                    <span>{item.title}</span> 
                                    <Button style={{ float: "right", marginTop: 34 }} type="primary">付款</Button>
                                </Card>
                             ))}
                        </Card>
                    </Content>
                    <Content>
                        <Tabs defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="未卖出" key="1">
                                {notSellOrderList.length !== 0 &&
                                notSellOrderList.map((item, index) => (
                                    <Card key={uuid()}
                                        title="商品"
                                    >
                                        <img
                                            src={item.pics[0]}
                                            style={{ width: 100 }}
                                            alt=""/>
                                        <span>{item.title}</span> 
                                        <Button style={{ float: "right", marginTop: 34 }} type="primary">下架</Button>
                                    </Card>
                                ))} 
                            </TabPane>
                            <TabPane tab="已卖出" key="2">
                                {soldOrderList.length !== 0 &&
                                soldOrderList.map((item, index) => (
                                    <Card key={uuid()}
                                        title="商品"
                                    >
                                        <img
                                            src={item.pics[0]}
                                            style={{ width: 100 }}
                                            alt=""/>
                                        <span>{item.title}</span> 
                                    </Card>
                                ))}
                            </TabPane>
                            <TabPane tab="已下架" key="3">
                                {soldOutOrderList.length !== 0 &&
                                soldOutOrderList.map((item, index) => (
                                    <Card key={uuid()}
                                        title="商品"
                                    >
                                        <img
                                            src={item.pics[0]}
                                            style={{ width: 100 }}
                                            alt=""/>
                                        <span>{item.title}</span> 
                                    </Card>
                                ))}
                            </TabPane>
                        </Tabs>
                    </Content>
                </Layout>
            </MySelf>
        )
    }
}

// export default MySelfContainer
export default withRouter(
    connect(
      MySelfContainer,
      [{ name: "detail", state: ["detailData"] },
      { name: "loginIn", state: ["loginInData"] }, 
      { name: "header" }]
    )
  );