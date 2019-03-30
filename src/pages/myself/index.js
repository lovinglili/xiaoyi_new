import React, { Component } from "react";
import { MySelf } from "./styles.js";
import { Layout,List, Avatar, Tabs, Card, Modal, Button, Cascader, Col, Row, Pagination, Icon, Menu } from "antd";
import HeaderContainer from "@c/Header";

const TabPane = Tabs.TabPane;
const {
  Header, Footer, Sider, Content,
} = Layout;
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
    callback(key) {
        console.log(key);
    }
    render(){
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
                            <Card
                                title="商品1"
                            >
                                <img
                                    src="https://img10.360buyimg.com/n1/s630x630_jfs/t23455/140/2011235680/255404/52e16e7d/5b6fecddNd5b6c223.jpg"
                                    style={{ width: 100 }}
                                    alt=""/>
                                <span>商品描述</span> 
                            </Card>
                        </Card>
                    </Content>
                    <Content>
                        <Tabs defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="已发布" key="1">Content of Tab Pane 1</TabPane>
                            <TabPane tab="已卖出" key="2">Content of Tab Pane 2</TabPane>
                            <TabPane tab="已下架" key="3">Content of Tab Pane 3</TabPane>
                        </Tabs>
                    </Content>
                </Layout>
            </MySelf>
        )
    }
}

export default MySelfContainer