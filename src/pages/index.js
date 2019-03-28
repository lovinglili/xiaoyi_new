import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import XiaoYiStyle from "@pages/home";
import LoginInContainer from "@pages/loginIn";
import LoginUpContainer from "@pages/loginUp";
import CategoryContainer from "@pages/category";
import DetailContainer from "@pages/detail";
import MySelfContainer from "@pages/myself";
import SubmitOrderContainer from "@pages/submitOrder";

class XiaoYi extends Component {
  render() {
    return (
      <div>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        <Route path="/home" component={XiaoYiStyle} />
        <Route path="/loginIn" component={LoginInContainer} />
        <Route path="/loginUp" component={LoginUpContainer} />
        <Route path="/category:categoryId" component={CategoryContainer} />
        <Route path="/detail:goodId" component={DetailContainer} />
        <Route path="/myself" component={MySelfContainer} />
        <Route path="/submitOrder:orderId" component={SubmitOrderContainer} />
      </Switch>
    </div>
    );
  }
}

export default XiaoYi;
