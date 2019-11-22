import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import TopPage from "./pages/TopPage";

const A = () => {
  return <div>Top</div>;
};

const MainRooter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TopPage} />
        <Route exact path="/home" component={A} />
        <Route exact path="/chat" component={ChatPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default MainRooter;
