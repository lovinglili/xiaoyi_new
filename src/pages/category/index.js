import React, { Component } from "react";
import { Layout } from "antd";
import HeaderContainer from "@c/Header";
import { Category } from "./styles.js";

class CategoryContainer extends Component {
  componentDidMount() {
    //  异步加载数据 dispatch
  }

  render() {
    return (
      <Category>
        <Layout>
          <Layout.Header>
            <HeaderContainer />
          </Layout.Header>
          <Layout.Content>
            <div>
              <p>打发士大夫</p>
            </div>
          </Layout.Content>
        </Layout>
      </Category>
    );
  }
}

export default CategoryContainer;
