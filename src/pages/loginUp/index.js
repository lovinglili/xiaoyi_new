import React, { Component } from "react";
import { Steps, Layout, Button, message,Form,Input ,Select,Checkbox} from "antd";
import HeaderContainer from "@c/Header";
import { LoginUp, LoginContent } from "./styles.js";

const Step = Steps.Step;
const Option=Select.Option;

class LoginUpContainers extends Component {
  // 注册
  state = {
    current: 0
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 16,
          offset: 8,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const steps = [
      {
        title: "验证手机号",
        content: ()=>(<div>
          <Form {...formItemLayout}>
          <Form.Item
              label="Phone Number"
              
            >
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(

                 <Input addonBefore={prefixSelector} style={{ width: '100%' }} /> 
               )} 
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
           )} 
        </Form.Item>
          </Form>
        </div>)
      },
      {
        title: "填写账户信息",
        content:()=>(<div><Form {...formItemLayout}>
         <Form.Item
          label={(
            <span>
              Nickname&nbsp;
              
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
           <Form.Item
          label="Password"
        >
          {getFieldDecorator('password', {
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
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
       
          </Form> </div>)
      },
      {
        title: "注册成功",
        content:()=>(<div>success</div>)
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
              <div className="steps-action">
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
              </div>
            </div>
          </LoginContent>
        </Layout>
      </LoginUp>
    );
  }
}


const LoginUpContainer=Form.create({})(LoginUpContainers)
export default LoginUpContainer;
