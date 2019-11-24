import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { setCurrentUser } from './actions/authen'

// page import
import ChatPage from "./pages/ChatPage";
import TopPage from "./pages/TopPage";
import LoginPage from './pages/LoginPage';


class Main extends Component {
  constructor(props) {
    super(props);
    props.setCurrentUser()
  }
  render() {
    return (
      <div style={{ height: '100vh' }}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={TopPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/chat" component={ChatPage} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: () => {
      dispatch(setCurrentUser())
    }
  }
}

export default connect(null, mapDispatchToProps)(Main);
