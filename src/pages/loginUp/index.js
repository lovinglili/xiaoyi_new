import React, { Component } from "react";
import { Steps, Layout, Button, message } from "antd";
import HeaderContainer from "@c/Header";
import { LoginUp, LoginContent } from "./styles.js";

const Step = Steps.Step;
const steps = [
  {
    title: "First",
    content: "First-content"
  },
  {
    title: "Second",
    content: "Second-content"
  },
  {
    title: "Last",
    content: "Last-content"
  }
];
class LoginUpContainer extends Component {
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
    return (
      <LoginUp>
        <Layout>
          <Layout.Header>
            <HeaderContainer />
          </Layout.Header>
          <LoginContent>
            <div style={{ width: "40%", margin: "60px auto 0 auto" }}>
              <Steps current={current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content">{steps[current].content}</div>
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

export default LoginUpContainer;
