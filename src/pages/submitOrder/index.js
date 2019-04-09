import React, { Component } from "react";
import { SubmitOrder, BusinessMessage } from "./styles.js";
import { Link, withRouter } from "react-router-dom";
import connect from "@connect";
import { Layout, Card, Modal, Input, Button, Form, Select ,message} from "antd";
import HeaderContainer from "@c/Header";
import createActionDetail from "../../store/detail/actionCreators";
import createActionLoginIn from "../../store/header/actionCreators";

const {
  Header, Footer, Content,
} = Layout;

const { Option } = Select;

connect.addActions({
  detail: createActionDetail,
  header: createActionLoginIn
});

class SubmitOrderContainers extends Component {

  state = {
    visible: false,
    listVisible:false,
    text: 'Unselect',
    currentAddressData: {},  // 存储当前渲染的地址
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
  }
  componentDidMount() {
    this.getDetailTo();
  }
  // 获取地址列表
  getAddressList = () => {
    const { loginIn: { userInfo = {} } } = this.props;
    const { nickName } = userInfo;
    const { detail_actions } = this.props;
    detail_actions.getAddress(nickName, () => { });
  }

  getDetailTo = () => {
    const { detail_actions, match } = this.props;
    let goodId = match.params.goodId ? (match.params.goodId).replace(/^:/, '') : ''; // 获取路径中的goodId
    detail_actions.getDetail(goodId,()=>{});
  }

  // 增加地址的model
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

// 添加地址成功
  handleOk = () => {
    const { detail_actions } = this.props;
    const { loginIn: { userInfo = {} } } = this.props;
    const { nickName } = userInfo;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { city, more } = values;
        const params = { ...city, more, nickName };
        // 添加收获地址，成功的时候改变state的状态；
        detail_actions.addAddress(params, (data) => {
          this.setState({
            visible: false,
            currentAddressData: data
          });
        });

      }
    })

  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  // 获取地址列表的弹窗
  showModalList=()=>{
    // 先获取列表的数据，再显示modal框
    const { detail_actions,loginIn} = this.props;
    const {userInfo:{nickName} }=loginIn;
    detail_actions.getAddress(nickName,()=>{
      this.setState({listVisible:true})
    });
  }

  // 选择某项地址

  chooseAddreList=()=>{
    // 选择state里面当前的地址信息，

  }

  getAddressListCancel = () => {
    this.setState({
      listVisible: false,
    });
  }


  handleChange = (value) => { // 获取到省id和市id
    this.setState({
      provinceId: value[0],
      cityId: value[1],
    });
  }

  // 获取该商品的id并跳转到个人中心的页面
  handleCardClick = (detailData) => {
    const { loginIn: { userInfo = {} } ,detail_actions, match} = this.props;
    const { nickName } = userInfo;
    const {currentAddressData:{_id}}=this.state;
    const {nickName:solderNickName,desc,pics,price,status,title,categoryTitle,categoryId}=detailData
    let goodId = match.params.goodId ? (match.params.goodId).replace(/^:/, '') : ''; // 获取路径中的goodId
    if(!_id || !nickName){
      message.error("请补充信息");
      return;
    }
    const params = {
      solderNickName, // 卖家的nickName
      desc,
      pics,
      price,
      title,
      categoryTitle,categoryId,
      nickName,
      addressId: _id,
      status,// 该商品的状态
      goodId // '所要购买的商品的id',
    }
    detail_actions.addOrder(params, ()=>{
      this.props.history.push({ pathname: `/myself` });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { loginIn: { userInfo = {} }, detail } = this.props;
    const { nickName } = userInfo;
    const {addressList}=detail;
    const { currentAddressData } = this.state;
    const { more = '', provinceName = '', cityName = '' ,receiveName=''} = currentAddressData;
    let myDetailData = Object.keys(detail.detailData).length !== 0 ? detail.detailData : {};
    let myPics = detail.detailData.pics ? detail.detailData.pics : [];
    // 增加的地址显示出来
    return (
      <SubmitOrder>
        <Layout>
          <Header>
            <HeaderContainer />
          </Header>
          <Content>
            <Card>
              <Card title="收货信息">

                <Button type="primary" onClick={this.showModal} style={{ marginRight: 16 }}>新增收货地址</Button>
                <Button type="primary" onClick={this.showModalList}>收货地址列表</Button>
              </Card>
              <Card
                title="商品信息"
              >
                <img
                  src={myPics[0]}
                  style={{ width: 200 }}
                  alt=""
                />
                <span>{myDetailData.title}</span>
              </Card>
            </Card>
            <Modal
              title="收货地址列表"
              width={620}
              visible={this.state.listVisible}
              // onOk={this.chooseAddreList}
              footer={null}
              onCancel={this.getAddressListCancel}
            >
            {/* addressList */}
            {addressList.map(item=>(
            <div>
              <p><span>{item.receiveName}</span><span>{item.phoneNumber}</span></p>
              <p><span>{item.provinceNam}-{item.cityName}-{item.more}</span></p>
            </div>
            ))}
            </Modal>
            <Modal
              title="新增收货地址"
              width={820}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Form>
              <Form.Item
                  label="收件人"
                  {...formItemLayout}
                >
                  {getFieldDecorator('receiveName', {
                    rules: [
                      {
                        required: true,
                        pattern: /^.{1,10}$/,
                        message: '请简要输入收件人名称'
                      },
                    ],
                  })(
                    <Input placeholder="请简要输入收件人名称"></Input>
                  )}
                </Form.Item>
              <Form.Item
                label="收货人电话"
                {...formItemLayout}

              >
                {getFieldDecorator('phoneNumber', {
                  initialValue:'',
                  rules: [{
                    required: true,
                    pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
                    message: '请输入收货人电话~'
                  }],
                })(

                  <Input placeholder='请输入收货人电话:' style={{ width: '100%' }} />
                )}
              </Form.Item>
                <Form.Item
                  label="所在地区"
                  {...formItemLayout}
                >
                  {getFieldDecorator('city', {
                    rules: [
                      { required: true, message: '请输入你的地址!' },
                    ],
                  })(
                    <CitySelect citiesList={this.state.cities} />
                  )}
                </Form.Item>
                <Form.Item
                  label="详细地址"
                  {...formItemLayout}
                >
                  {getFieldDecorator('more', {
                    rules: [
                      {
                        required: true,
                        pattern: /^.{1,30}$/,
                        message: '请简要输入详细信息'
                      },
                    ],
                  })(
                    <Input placeholder="请输入你的详细信息"></Input>
                  )}
                </Form.Item>
              </Form>
            </Modal>
          </Content>
          <Footer>
            <div>
              <div>
                <span>应付金额：
                  <span style={{
                    fontFamily: "jdzh-r",
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#ff3434"
                  }}>
                    ¥{myDetailData.price}
                  </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span>地址：<span>{provinceName}-{cityName}-{more}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>收件人：<span>{receiveName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
            </div>
            <BusinessMessage>
              <div className="contact">
                <div className="contact-seller">
                  <span className="phone-number"
                    onClick={() => this.handleCardClick(myDetailData)}
                  >
                    提交订单
                  </span>
                </div>
              </div>
            </BusinessMessage>
          </Footer>
        </Layout>
      </SubmitOrder>
    );
  }
}

class CitySelect extends React.Component {

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
    let children = [];
    const areaList = citiesList.filter(item => (item.name === state.provinceName));
    if (areaList.length !== 0) {
      children = areaList[0].children;
    }
    return (
      <span>
        <Select
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

const SubmitOrderContainer = Form.create({})(SubmitOrderContainers);

// export default SubmitOrderContainer;
export default withRouter(
  connect(
    SubmitOrderContainer,
    [{ name: "detail", state: ["detailData"] },
    { name: "loginIn" }]
  )
);
