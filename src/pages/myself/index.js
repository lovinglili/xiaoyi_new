import React, { Component } from "react";
import { MySelf } from "./styles.js";
import { Layout, List, Avatar, Tabs, Card, Modal, Button, Cascader, Col, Row, Pagination, Icon, Menu } from "antd";
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
        this.getOrderListTo();
        this.setState({
            orderList: localStorage.goods,
        });
    }

    getOrderListTo = () => {
        const { detail_actions, loginIn } = this.props;
        let nickName = loginIn.userInfo.nickName;
        detail_actions.getOrderList(nickName, this.toConsole);
    }

    getDetailTo = () => {
        const { detail_actions, match } = this.props;
        let goodId = match.params.goodId ? (match.params.goodId).replace(/^:/, '') : ''; // 获取路径中的goodId
        detail_actions.getDetail(goodId, this.toConsole);
    }
    toConsole() {
        console.log(2333);
    }
    callback(key) {
        console.log(key);
    }

    // 下架
    handleNoSold = (id) => {
        const { detail_actions, header_actions } = this.props;
        detail_actions.changeGoodStatus(id, 2, () => {
            header_actions.fetchAllList();
        });

    }

    render() {
        const { detail, header, loginIn } = this.props;
        if (header.listData === {}) return;
        let allList = header.listData;
        let nowUser = loginIn.userInfo.nickName;
        let myList = _.filter(allList, item => item.nickName === nowUser);
        let orderList = detail.orderList;
        console.log('23', this.props, allList, nowUser, myList, orderList);
        // let myList = JSON.parse(localStorage.goods); // 所有订单
        let myNotSellList = _.filter(myList, item => item.status === 0); // 未卖出
        let mySoldList = _.filter(myList, item => item.status === 1); // 已卖出
        let mySoldOutList = _.filter(myList, item => item.status === 2); // 已下架
        console.log('myList/this.state.myList.pics', myList, mySoldList, mySoldOutList);
        return (
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
                            {myList.length !== 0 && Array.isArray(myList) &&
                                myList.map((item, index) => (
                                    <Card key={uuid()}
                                        title="商品"
                                    >
                                        <img
                                            src={item.pics[0]}
                                            style={{ width: 100 }}
                                            alt="" />
                                        <span>{item.title}</span>
                                        <Button style={{ float: "right", marginTop: 34, marginLeft: 10 }} type="primary">购买</Button>
                                        <Button style={{ float: "right", marginTop: 34 }} type="primary">取消</Button>
                                    </Card>
                                ))}
                        </Card>
                    </Content>
                    <Content>
                        <Tabs defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="未卖出" key="1">
                                {myNotSellList.length !== 0 &&
                                    myNotSellList.map((item, index) => (
                                        <Card key={uuid()}
                                            title="商品"
                                        >
                                            <img
                                                src={item.pics[0]}
                                                style={{ width: 100 }}
                                                alt="" />
                                            <span>{item.title}</span>
                                            <Button style={{ float: "right", marginTop: 34, marginLeft: 10 }} type="primary">编辑</Button>
                                            <Button style={{ float: "right", marginTop: 34 }} type="primary" onClick={() => this.handleNoSold(item._id)}>下架</Button>
                                        </Card>
                                    ))}
                            </TabPane>
                            <TabPane tab="已卖出" key="2">
                                {mySoldList.length !== 0 &&
                                    mySoldList.map((item, index) => (
                                        <Card key={uuid()}
                                            title="商品"
                                        >
                                            <img
                                                src={item.pics[0]}
                                                style={{ width: 100 }}
                                                alt="" />
                                            <span>{item.title}</span>
                                        </Card>
                                    ))}
                            </TabPane>
                            <TabPane tab="已下架" key="3">
                                {mySoldOutList.length !== 0 &&
                                    mySoldOutList.map((item, index) => (
                                        <Card key={uuid()}
                                            title="商品"
                                        >
                                            <img
                                                src={item.pics[0]}
                                                style={{ width: 100 }}
                                                alt="" />
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