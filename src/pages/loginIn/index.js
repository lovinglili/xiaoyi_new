import React, { Component } from "react";
import HeaderContainer from "@c/Header";
import { Link } from "react-router-dom";
import { LoginIn ,LoginInContent} from "./styles.js";
import { Layout, Form, Icon, Input, Button, Checkbox, } from "antd";

// 登录
class LoginInContainers extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <LoginIn>
        <Layout>
          <Layout.Header>
            <HeaderContainer type='loginIn' />
          </Layout.Header>
          <LoginInContent>
            <div style={{ width: "40%", margin: "60px auto 0 auto" }}>


          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
          </Button>
              Or <Link to="/loginUp">register now!</Link>
            </Form.Item>
          </Form>
          </div>

          </LoginInContent>

        </Layout>
      </LoginIn>
    );
  }
}

const LoginInContainer = Form.create({})(LoginInContainers);


export default LoginInContainer;
