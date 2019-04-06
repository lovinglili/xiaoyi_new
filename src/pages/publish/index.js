import React, { PureComponent } from "react";
import { Form, Layout, Button, Input, Upload, Select, InputNumber, Icon, Tooltip } from "antd";
import HeaderContainer from "@c/Header";
import { withRouter } from "react-router-dom";
import connect from "@connect";
import { Publish, PublichContent } from "./styles.js";

const { Option } = Select;
const { TextArea } = Input;
class PublishContainers extends PureComponent {
    state = {
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
    // componentDidMount() {
    //     const { detail_actions } = this.props;
    //     detail_actions.getCities(() => { });
    // }

    // componentWillReceiveProps(nextProps) {
    //     const { cities, categories } = this.state;
    //     const { detail: { citiesList: { list = [] } }, header: { categoryList } } = nextProps;
    //     if (list !== cities || categories !== categoryList) {
    //         this.setState({ cities: list, categories: categoryList })
    //     }
    // }

    // 处理提交的函数
    handleSubmit = (e) => {
        e.preventDefault();
        const {loginIn:{userInfo:{nickName}}}=this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
                    nickName
                }
                const { loginIn_actions } = this.props;
                loginIn_actions.publishGood(postValue,()=>{this.props.history.push({ pathname: `/myself` })});
            }
        });
    };

    // 上传文件
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (<Publish>
            <Layout>
                <Layout.Header>
                    <HeaderContainer />
                </Layout.Header>
                <PublichContent>
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
                            })(
                                <TextArea rows={6} placeholder="详细描述一下商品的新旧程度,使用感受,入手渠道,出售原因吧~，600 字符以内"></TextArea>
                            )}
                        </Form.Item>

                        <Form.Item
                            label={<span>上传商品图片&nbsp;&nbsp;<Tooltip title="多角度拍摄商品细节，全面展示商品;照片不要过大哦~"><Icon type="exclamation-circle"></Icon></Tooltip></span>}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('pics', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(


                                <Upload name="logo" action="/upload.do" listType="picture">
                                    <div style={{ width: 200, height: 200, border: '1px dashed #bbb', position: 'relative' }}>
                                        <div style={{ width: 6, height: 100, top: 50, left: 97, background: '#999', position: 'absolute' }}></div>
                                        <div style={{ width: 100, height: 6, top: 97, left: 50, position: 'absolute', background: '#999' }}></div>
                                    </div>
                                    {/* <input type="file" multiple="multiple"></input> */}
                                </Upload>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="发布地址"
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
                            label="售卖价"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('price', {
                                initialValue: 1000,
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
                                initialValue: 1000,
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
                            })(
                                <CategorySelect categoryList={this.state.categories} />
                            )}
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 12, offset: 6 }}
                        >
                            <Button type="primary" htmlType="submit">确认发布</Button>
                        </Form.Item>
                    </Form>
                </PublichContent>
            </Layout>
        </Publish>)
    }
}

const PublishContainer = Form.create({})(PublishContainers);
class CategorySelect extends React.Component {

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
        let children = [];
        const currentCate = categoryList.filter(item => (item.categoryTitle === state.categoryTitle));
        if (currentCate.length !== 0) {
            children = currentCate[0].list;
        }
        return (
            <span>
                <Select
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

export default withRouter(
    connect(
        PublishContainer,
        [{ name: "loginIn" }, { name: "header" }, { name: 'detail' }]
    )
);