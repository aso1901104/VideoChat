import React, { Component } from "react";
import Header from "./components/Header";
import ChatPageHeader from "./components/ChatPageHeader";
import Footer from "./components/Footer";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { setCurrentUser } from './actions/authen'

// page import
import ChatPage from "./pages/ChatPage";
import TopPage from "./pages/TopPage";
import LoginPage from './pages/LoginPage';
import CreateRoomPage from './pages/CreateRoomPage'

const APP_URL = process.env.MIX_APP_URL;


class Main extends Component {
  constructor(props) {
    super(props);
    props.setCurrentUser()
  }
  render() {
    return (
      <div style={{ height: '100vh' }}>
        <BrowserRouter>
          {!this.props.chat.isChatPage ? <Header /> : <ChatPageHeader />}
          <Switch>
            <Route exact path="/" component={TopPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/chat/:roomName" component={ChatPage} />
            <Route exact path="/create-room" component={CreateRoomPage} />
          </Switch>
          {!this.props.chat.isChatPage && <Footer />}
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

const mapStateToProps = state => {
  return {
    chat: state.chat,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
