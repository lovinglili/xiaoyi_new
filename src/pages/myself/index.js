import React, { Component } from "react";
import { MySelf } from "./styles.js";
import { Form, Layout, Button, Input, Upload, Select, InputNumber, Icon,
     Tooltip,  Avatar, Tabs, Card, Modal} from "antd";
import HeaderContainer from "@c/Header";
import connect from "@connect";
import {withRouter } from "react-router-dom";
import createActionDetail from "../../store/detail/actionCreators";
import createActionLoginIn from "../../store/header/actionCreators";
import uuid from "uuid/v1";
import _ from 'lodash';

const { Option } = Select;
const { TextArea } = Input;

const TabPane = Tabs.TabPane;
const { Header, Content,} = Layout;
connect.addActions({
    detail: createActionDetail,
    header: createActionLoginIn
});
// const props = {
//     // action: '//jsonplaceholder.typicode.com/posts/',
//     // action: '/xiaoyi/saveImg',
//     onChange({ file, fileList }) {
//       if (file.status !== 'uploading') {
//         console.log('props/onChange:', file, fileList);
//       }
//     },
//     defaultFileList: [{
//       uid: '1',
//       name: 'xxx.png',
//       status: 'done',
//       response: 'Server Error 500', // custom error message to show
//       url: 'http://www.baidu.com/xxx.png',
//     }, {
//       uid: '2',
//       name: 'yyy.png',
//       status: 'done',
//       url: 'http://www.baidu.com/yyy.png',
//     }, {
//       uid: '3',
//       name: 'zzz.png',
//       status: 'error',
//       response: 'Server Error 500', // custom error message to show
//       url: 'http://www.baidu.com/zzz.png',
//     }],
//   };
class MySelfContainers extends Component {
    state = {
        orderList: [],
        visible: false,
        nowGoods: {}, // 当前编辑的商品
        defaultFileList: [
          {
            uid: '1',
            name: 'xxx233.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/xxx.png',
          },
        //   {
        //     uid: '2',
        //     name: 'yyy233.png',
        //     status: 'done',
        //     url: 'http://www.baidu.com/yyy.png',
        //   }
        ],
        cities: [{
            "id": 1,
            "name": "北京",
            "children": [
                {
                    "id": 2816,
                    "name": "密云区"
                }
            ]
        },
        {
            "id": 8,
            "name": "驻马店",
            "children": [
                {
                    "id": 586,
                    "name": "驿城区"
                },
                {
                    "id": 588,
                    "name": "新区"
                }
            ]
        }], // 城市集合
        categories: [{
            "categoryTitle": "手机数码",
            "categoryId": 111,
            "list": [
                {
                    "id": "1",
                    "name": "蓝牙耳机"
                },
                {
                    "id": "2",
                    "name": "数据线"
                },
                {
                    "id": "3",
                    "name": "手环"
                },
                {
                    "id": "4",
                    "name": "相机"
                },
                {
                    "id": "5",
                    "name": "其他手机数码"
                }
            ]
        },
        {
            "categoryTitle": "服饰",
            "list": [
                {
                    "id": "6",
                    "name": "半身裙"
                },
                {
                    "id": "7",
                    "name": "牛仔裤"
                },
                {
                    "id": "8",
                    "name": "衬衫"
                },
                {
                    "id": "9",
                    "name": "外套"
                },
                {
                    "id": "10",
                    "name": "其他服饰"
                }
            ],
            "categoryId": 222
        },
        {
            "categoryTitle": "美妆",
            "list": [
                {
                    "id": "11",
                    "name": "洁面用品"
                },
                {
                    "id": "12",
                    "name": "防晒"
                },
                {
                    "id": "13",
                    "name": "粉底液"
                },
                {
                    "id": "14",
                    "name": "香水"
                },
                {
                    "id": "15",
                    "name": "其他美妆"
                }
            ],
            "categoryId": 333
        }], // 商品分类集合
    }
    showModal = (id) => {
        console.log('showModal/id:', id);
        const { detail, header, loginIn } = this.props;
        if (header.listData === {}) return;
        let allList = header.listData;
        let nowUser = loginIn.userInfo.nickName;
        let myList = _.filter(allList, item => item.nickName === nowUser);
        let orderList = detail.orderList;
        // let myList = JSON.parse(localStorage.goods); // 所有订单
        let myNotSellList = _.filter(myList, item => item.status === 0); // 未卖出
        let _nowGoods = myNotSellList.find((item) => item._id === id); // 要编辑的商品
        let _defaultFileList = Object.assign({}, this.state.defaultFileList[0], { url: _nowGoods.pics[0], name: _nowGoods.pics[0].replace(/\/uploads\/logos\//, '') });
        console.log('showModal/myNotSellList:', myNotSellList, _nowGoods);
        this.setState({
          visible: true,
          nowGoods: _nowGoods,
          defaultFileList: [_defaultFileList],
          editGoodId:id
        });
      }
    
      handleOk = (e) => {
        console.log('handleOk:', e);
        this.handleSubmit();
        // this.setState({
        //   visible: false,
        // });
      }
    
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
      
    componentDidMount() {
        // this.getDetailTo();
        setTimeout(()=>{
            this.getOrderListTo();
        },500)
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

    // 处理提交的函数
    // handleSubmit = (e) => {
        // console.log('handleSubmit:', e);
        // e.preventDefault();
    handleSubmit = () => {
        const { loginIn: { userInfo: { nickName } }, detail_actions,header_actions } = this.props
        const {editGoodId}=this.state;
        this.props.form.validateFields((err, values) =>{
            if (!err) {
                const { category: { categoryTitle, categoryId, id, name },
                    city: { cityName, provinceName, cityId, provinceId },
                    desc,
                    originPrice,
                    pics,
                    price,
                    title
                } = values;
                const postValue = {
                    categoryTitle, categoryId, id, name, cityName, provinceName, cityId, provinceId, desc,
                    originPrice,
                    pics,
                    price,
                    title,
                    nickName,
                    _id:editGoodId
                }
                detail_actions.updateGood(postValue, () => { 
                    header_actions.fetchAllList();
                    this.setState({
                        visible: false,
                    });
                 });
            
            }
        });
    }


    handleInutImage(){
        var reads = new FileReader();
        var f = this.files[0];
        console.log(f,"sfd")
        reads.readAsDataURL(f);
        reads.onload = function (e) {
            document.getElementById('preview').src = this.result;
        };
    }
    // 下架
    handleNoSold = (id) => {
        const { detail_actions, header_actions } = this.props;
        detail_actions.changeGoodStatus(id, 2, () => {
            header_actions.fetchAllList();
        });

    }
    // 取消订单
    handleCancelBuy=(id)=>{
        const {detail_actions}=this.props;
        detail_actions.cancelOrder(id, () => {
              this.getOrderListTo();
        });
    }

    // 购买商品,购买成功，获取订单列表和商品列表
    handleBuy=(itemId,orderId)=>{
        const { detail_actions, header_actions } = this.props;
        detail_actions.changeGoodStatus(itemId, 1, () => {
            detail_actions.changeOrderStatus(orderId,1,()=>{
                this.getOrderListTo();
                header_actions.fetchAllList();
            })
        });
    }

    // 点击商品，进入商品详情

    render() {
        const { detail, header, loginIn } = this.props;
        if (header.listData === {}) return;
        let allList = header.listData;
        let nowUser = loginIn.userInfo.nickName;
        let myList = _.filter(allList, item => item.nickName === nowUser);
        let orderList = detail.orderList;
        // let myList = JSON.parse(localStorage.goods); // 所有订单
        let myNotSellList = _.filter(myList, item => item.status === 0); // 未卖出
        let mySoldList = _.filter(myList, item => item.status === 1); // 已卖出
        let mySoldOutList = _.filter(myList, item => item.status === 2); // 已下架
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        console.log(' defaultFileList={this.state.defaultFileList},orderList:', this.state.defaultFileList, orderList);
        return (
            <MySelf>
                <Layout>
                    <Layout.Header>
                        <HeaderContainer />
                    </Layout.Header>
                    <Content style={{marginTop: 100}}>
                        个人中心
                        <Card>
                            <Avatar size={164} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <span>昵称：{nowUser}</span>
                        </Card>
                        <Card title="订单">
                            {orderList.length !== 0 && Array.isArray(orderList) &&
                                orderList.map((item) => (
                                    <Card key={uuid()}
                                       
                                    >
                                        <div style={{ float: "left",  marginRight: 24 }}>
                                            <img src={item.pics[0]} style={{ width: 100 }} alt="" />
                                        </div>
                                        <div style={{ float: "left" }}>
                                            <div style={{ fontWeight: "bold", fontSize: 14,width: 620,
                                              whiteSpace: "nowrap",textOverflow:"ellipsis",overflow:"hidden" }}> {item.title}商品描述
                                              商品描述商品描述商品描述商品商品描述商品描述商品描述商品描述商品商
                                              品描述商品描述商品描述商品描述商品商品描述商品描述商品描述商品描述
                                              商品商品描述商品描述商品描述商品描述商品 </div>
                                            <div style={{ color: "#d2c3c3", marginTop: 5, marginBottom: 5,width: 620,
                                             whiteSpace: "nowrap",textOverflow:"ellipsis",overflow:"hidden" }}> {item.desc}商品描述商品
                                             描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描
                                             述商品描述商品描述 </div>
                                            <div style={{ color: "red" }}> ￥{item.price} </div>
                                        </div>
                                        {item.status ===0 &&
                                        <div>
                                            <Button style={{ float: "right", marginTop: 34, marginLeft: 10 }} type="primary" onClick={()=>this.handleBuy(item.goodId,item._id)}>购买</Button>
                                            <Button style={{ float: "right", marginTop: 34 }} type="primary" onClick={()=>this.handleCancelBuy(item._id)}>取消</Button>
                                        </div>}
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
                                            onClick={()=>{
                                                this.props.history.push({ pathname: `/detail:${item._id}` });
                                                 
                                            }}
                                                src={item.pics[0]}
                                                style={{ width: 100 }}
                                                alt="" />
                                            <span>{item.title}</span>
                                            <Button style={{ float: "right", marginTop: 34, marginLeft: 10 }} onClick={() => this.showModal(item._id)} type="primary">编辑</Button>
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
                                              onClick={()=>{
                                                this.props.history.push({ pathname: `/detail:${item._id}` });
                                                 
                                            }}
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
                                              onClick={()=>{
                                                this.props.history.push({ pathname: `/detail:${item._id}` });
                                                 
                                            }}
                                                src={item.pics[0]}
                                                style={{ width: 100 }}
                                                alt="" />
                                            <span>{item.title}</span>
                                        </Card>
                                    ))}
                            </TabPane>
                        </Tabs>
                    </Content>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        >
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item
                                label="商品标题"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('title', {
                                    rules: [
                                        {
                                            required: true,
                                            pattern: /^.{1,30}$/,
                                            message: '给你的好物起个名字吧~,30 字符以内'
                                        },
                                    ],
                                    initialValue: this.state.nowGoods.title,
                                })(
                                    <Input placeholder="给你的好物起个名字吧~,30 字符以内"></Input>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="描述下你的商品吧"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('desc', {
                                    rules: [
                                        {
                                            required: true,
                                            pattern: /^.{1,600}$/,
                                            message: '600 字符以内'
                                        },
                                    ],
                                    initialValue: this.state.nowGoods.desc,
                                })(
                                    <TextArea rows={6} placeholder="详细描述一下商品的新旧程度,使用感受,入手渠道,出售原因吧~，600 字符以内"></TextArea>
                                )}
                            </Form.Item>
                            <Form.Item
                                label={<span>上传商品图片&nbsp;&nbsp;<Tooltip title="多角度拍摄商品细节，全面展示商品;照片不要过大哦~"><Icon type="exclamation-circle"></Icon></Tooltip></span>}
                                {...formItemLayout}
                            >
                                {getFieldDecorator('pics', {
                                        // valuePropName: 'fileList',
                                        // getValueFromEvent: this.normFile, // TODO TODO,
                                        initialValue: this.state.nowGoods.pics,
                                    })(
                                    <div>
                                        <Upload defaultFileList={this.state.defaultFileList} name="logo"  listType="picture"  action='/xiaoyi/saveImg'>
                                            <div style={{ width: 200, height: 200, border: '1px dashed #bbb', position: 'relative' }}>
                                                <div style={{ width: 6, height: 100, top: 50, left: 97, background: '#999', position: 'absolute' }}></div>
                                                <div style={{ width: 100, height: 6, top: 97, left: 50, position: 'absolute', background: '#999' }}></div>
                                            </div>
                                        </Upload>
                                        {/* <Upload {...props}>
                                            <Button>
                                            <Icon type="upload" /> Upload2333
                                            </Button>
                                        </Upload> */}
                                    </div>
                                )}
                            </Form.Item> 
                            <Form.Item
                                label="发布地址"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('city', {
                                    rules: [
                                        { required: true, message: '请输入你的地址!' },
                                    ]
                                })(
                                    <CitySelect nowGoods={this.state.nowGoods} citiesList={this.state.cities} />
                                )}
                            </Form.Item>

                            <Form.Item
                                label="售卖价"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('price', {
                                    initialValue: this.state.nowGoods.price,
                                    rules: [
                                        { required: true, message: '请输入要售卖的价钱!' },
                                    ],
                                })(
                                    <InputNumber
                                        formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/￥\s?|(,*)/g, '')}
                                        min={1}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item
                                label="原价"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('originPrice', {
                                    initialValue: this.state.nowGoods.originPrice,
                                    rules: [
                                        { required: true, message: '请输入所售卖的商品原价!' },
                                    ],
                                })(
                                    <InputNumber
                                        formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/￥\s?|(,*)/g, '')}
                                        min={1}
                                    />
                                )}
                            </Form.Item>

                            <Form.Item
                                label="商品分类"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('category', {
                                    rules: [
                                        { required: true, message: '请给你的商品选个家吧!' },
                                    ],
                                    initialValue: this.state.nowGoods.category,
                                })(
                                    <CategorySelect nowGoods={this.state.nowGoods} categoryList={this.state.categories} />
                                )}
                            </Form.Item>
                            {/* <Form.Item
                                wrapperCol={{ span: 12, offset: 6 }}
                            >
                                <Button type="primary" htmlType="submit">确认发布</Button>
                            </Form.Item> */}
                        </Form>
                    </Modal>
                </Layout>
            </MySelf>
        )
    }
}

const MySelfContainer = Form.create({})(MySelfContainers);
class CategorySelect extends React.Component {
    componentDidMount() {
        const { nowGoods } = this.props;
        if (!('value' in this.props)) {
            this.setState({ categoryTitle: nowGoods.categoryTitle, categoryId: nowGoods.categoryId });
            this.setState({ name: nowGoods.name, id: nowGoods.id });
        }
        this.triggerChange({ categoryTitle: nowGoods.categoryTitle, categoryId: nowGoods.categoryId });
        this.triggerChange({ name: nowGoods.name, id: nowGoods.id });
    }

    handleMainCateChange = info => {
        const { key, label } = info
        if (!('value' in this.props)) {
            this.setState({ categoryTitle: label, categoryId: key });
        }
        this.triggerChange({ categoryTitle: label, categoryId: key });
    }

    handleCateChange = info => {
        const { key, label } = info;
        if (!('value' in this.props)) {
            this.setState({ name: label, id: key });
        }
        this.triggerChange({ name: label, id: key });
    }

    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }

    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }

    constructor(props) {
        super(props);

        const value = props.value || {};
        this.state = {
            categoryTitle: value.categoryTitle,
            categoryId: value.categoryId,
            name: value.name,
            id: value.id
        };
    }


    render() {
        const state = this.state;
        const { categoryList } = this.props;
        const { nowGoods } = this.props;
        let children = [];
        const currentCate = categoryList.filter(item => (item.categoryTitle === state.categoryTitle));
        if (currentCate.length !== 0) {
            children = currentCate[0].list;
        }
        return (
            <span>
                <Select
                    defaultValue={{ key: nowGoods.categoryTitle }}
                    style={{ width: '46%', marginRight: '3%' }}
                    placeholder='请选择'
                    labelInValue
                    onChange={this.handleMainCateChange}
                >
                    {
                        categoryList.length !== 0 && (categoryList.map(item => (
                            <Option key={item.categoryId} value={item.categoryId}>{item.categoryTitle}</Option>
                        ))
                        )
                    }
                </Select>
                <Select
                    defaultValue={{ key: nowGoods.name }}
                    style={{ width: '46%', marginRight: '3%' }}
                    placeholder='请选择'
                    labelInValue
                    onChange={this.handleCateChange}
                >
                    {
                        children.length !== 0 && (children.map(item => (
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        ))
                        )
                    }
                </Select>
            </span>
        );
    }
}

class CitySelect extends React.Component {
    componentDidMount() {
        const { nowGoods } = this.props;
        if (!('value' in this.props)) {
            this.setState({ provinceName: nowGoods.provinceName, provinceId: nowGoods.provinceId });
            this.setState({ cityName: nowGoods.cityName, cityId: nowGoods.cityId });
        }
        this.triggerChange({ provinceName: nowGoods.provinceName, provinceId: nowGoods.provinceId });
        this.triggerChange({ cityName: nowGoods.cityName, cityId: nowGoods.cityId });
    }

    handleProvinceChange = info => {
        const { key, label } = info
        if (!('value' in this.props)) {
            this.setState({ provinceName: label, provinceId: key });
        }
        this.triggerChange({ provinceName: label, provinceId: key });
    }

    handleAreaChange = info => {
        const { key, label } = info
        if (!('value' in this.props)) {
            this.setState({ cityName: label, cityId: key });
        }
        this.triggerChange({ cityName: label, cityId: key });
    }

    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }

    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }

    constructor(props) {
        super(props);

        const value = props.value || {};
        this.state = {
            provinceName: value.provinceName,
            provinceId: value.proviceName,
            cityName: value.cityName,
            cityId: value.cityId
        };
    }

    render() {
        const state = this.state;
        const { citiesList } = this.props;
        const { nowGoods } = this.props;
        let children = [];
        const areaList = citiesList.filter(item => (item.name === state.provinceName));
        if (areaList.length !== 0) {
            children = areaList[0].children;
        }
        return (
            <span>
                <Select
                    defaultValue={{ key: nowGoods.provinceName }}
                    style={{ width: '30%', marginRight: '3%' }}
                    placeholder='请选择'
                    onChange={this.handleProvinceChange}
                    labelInValue
                >{
                        citiesList.length !== 0 && (citiesList.map(item => (
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        ))
                        )
                    }
                </Select>
                <Select
                    defaultValue={{ key: nowGoods.cityName }}
                    style={{ width: '30%', marginRight: '3%' }}
                    placeholder='请选择'
                    onChange={this.handleAreaChange}
                    labelInValue
                >
                    {
                        children.length !== 0 && (children.map(item => (
                            <Option key={item.id} value={item.id} >{item.name}</Option>
                        ))
                        )
                    }
                </Select>
            </span>
        );
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