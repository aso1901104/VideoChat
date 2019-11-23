import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import TopPage from "./pages/TopPage";
class Main extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div style={{ height: '100vh' }}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={TopPage} />

            <Route exact path="/chat" component={ChatPage} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
export default Main;
