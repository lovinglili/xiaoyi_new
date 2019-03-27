import React, { Component } from "react";
import { Steps, Layout, Button, message,Form,Input ,Select,Checkbox} from "antd";
import HeaderContainer from "@c/Header";
import { LoginUp, LoginContent } from "./styles.js";

const Step = Steps.Step;
const Option=Select.Option;

class LoginUpContainers extends Component {
  // 注册
  state = {
    current: 0,
    loginUpInfo:{}, // 注册过程中的数据
  };

  next() {
    const {loginUpInfo}=this.state;
        // 获取数据成功之后才能到下一步
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {agreement}=values;
        if(agreement){
          const current = this.state.current + 1;
          this.setState({ current,loginUpInfo:{...loginUpInfo,
           ... values
          } });
        }
      }
    });
  }

  secondNext(){
    const {loginUpInfo}=this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {password,confirm}=values;
        if(password!==confirm){
          message.error('密码输入错误，请重新输入')
        }else{
          const current = this.state.current + 1;
          this.setState({ current ,loginUpInfo:{...loginUpInfo,...values}});
        }
      }
    });
  }

  prev() {
    const {loginUpInfo}=this.state;
    this.props.form.validateFields((err, values) => {

      const current = this.state.current - 1;
      this.setState({ current ,loginUpInfo:{
        ...loginUpInfo,...values
      }});
    })
  }

  render() {
    const { current,loginUpInfo } = this.state;
    const { getFieldDecorator } = this.props.form;
    const {prefix,phoneNumber,agreement,nickName,password,confirm}=loginUpInfo;
    console.log(this.state.loginUpInfo,"lo")
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: prefix || '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 6,
        },
        sm: {
          span: 12,
          offset: 6,
        },
      },
    };
    const steps = [
      {
        title: "验证手机号",
        content: ()=>(
          <div style={{marginTop:16}}>
          <Form >
          <Form.Item
              label="Phone Number"
          {...formItemLayout}
              
            >
              {getFieldDecorator('phoneNumber', {
                initialValue:phoneNumber || '',
                rules: [{ required: true,
                  pattern:/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
                   message: 'Please input your phone number!' }],
              })(

                 <Input addonBefore={prefixSelector} style={{ width: '100%' }} /> 
               )} 
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
            initialValue:agreement || false,
            rules:[{
              required:true
            }]
          })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
           )} 
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
        <Button type="primary" onClick={() => this.next()}>
                    Next
                  </Button>
          </Form.Item>
          </Form>
          </div>
        )
      },
      {
        title: "填写账户信息",
        content:()=>(
          <div style={{marginTop:16}}>
        <Form >
         <Form.Item
         {...formItemLayout}
          label={(
            <span>
              Nickname&nbsp;
              
            </span>
          )}
        >
          {getFieldDecorator('nickName', {
            initialValue:nickName || '',
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
           <Form.Item
          label="Password"
          {...formItemLayout}
        >
          {getFieldDecorator('password', {
            initialValue:password || '',
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
        {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            initialValue:confirm || '',
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
       <Form.Item {...tailFormItemLayout}>
       <Button type="primary" onClick={() => this.secondNext()}>
                    Next
                  </Button>
       <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    Previous
                  </Button>
       </Form.Item>
          </Form> </div>)
      },
      {
        title: "注册成功",
        content:()=>(<div style={{width:'100%',marginTop:'30px',textAlign:'center'}}>
        <h3 style={{display:'inline-block'}}>注册成功，开启你的省钱之旅！</h3> 
        </div>)
      }
    ];
    return (
      <LoginUp>
        <Layout>
          <Layout.Header>
            <HeaderContainer type='loginUp' />
          </Layout.Header>
          <LoginContent>
            <div style={{ width: "40%", margin: "60px auto 0 auto" }}>
              <Steps current={current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content">{steps[current].content()}</div>
              {/* <div className="steps-action">
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => this.next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button
                    type="primary"
                    onClick={() => message.success("Processing complete!")}
                  >
                    Done
                  </Button>
                )}
                {current > 0 && (
                  <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    Previous
                  </Button>
                )}
              </div> */}
            </div>
          </LoginContent>
        </Layout>
      </LoginUp>
    );
  }
}


const LoginUpContainer=Form.create({})(LoginUpContainers)
export default LoginUpContainer;
