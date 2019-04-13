import React, { Component } from "react";
import HeaderContainer from "@c/Header";
import { Link, withRouter } from "react-router-dom";
import connect from "@connect";
import { LoginIn, LoginInContent } from "./styles.js";
import { Layout, Form, Icon, Input, Button, Checkbox, } from "antd";
import createActionLoginIn from "../../store/loginIn/actionCreators";

connect.addActions({
  loginIn: createActionLoginIn
});

// 登录
class LoginInContainers extends Component {

  state = {
    rememberValue: true, // 记住密码的标志
    assignUser: {
      nickName:'', password:''
    }
  }
  componentDidMount() {
    if(localStorage['user']){
      const rememberUser = JSON.parse(localStorage.getItem("user"));
      const {remember}=rememberUser;
      if(remember){ // remeber 为true 就说明是保存的
        this.setState({
          assignUser: rememberUser 
        })
      }
    }
  }

  // 登录的操作,发送到后端请求，rememberValue为true，则将数据存储到localStorage；
  handleSubmit = (e) => {
    const { loginIn_actions } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        loginIn_actions.fetchLoginIn(JSON.stringify(values), () => this.assignSuccess(values))
      }
    });
  }

  assignSuccess = (values) => {
    const {loginIn_actions}=this.props;
    // const storeValue = rememberValue ? values : {nackName:'',password:''};
    localStorage.setItem("user", JSON.stringify(values));
    loginIn_actions.storeNickName(values);
    this.props.history.goBack();
  }


  // 切换 remember me
  handleRemeberChange = () => {
    const { rememberValue } = this.state;
    this.setState({
      rememberValue: !rememberValue
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { rememberValue, assignUser } = this.state;
    const { nickName, password} = assignUser;
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
                  {getFieldDecorator('nickName', {
                    initialValue: nickName || '',
                    rules: [{
                      required: true, pattern: /^[a-zA-Z0-9]{4,16}$/,
                      message: '请输入你的昵称,4-16个字母，数字',
                    }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="nickName" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    initialValue: password || '',
                    rules: [{
                      required: true, pattern: /^(\w){6,20}$/,
                      message: '请输入密码,6-20个字母、数字、下划线!'
                    }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: rememberValue,
                  })(
                    <Checkbox onChange={this.handleRemeberChange}>Remember me</Checkbox>
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



export default withRouter(
  connect(
    LoginInContainer,
    [{ name: "loginIn", state: ["loginInData"] }]
  )
);
