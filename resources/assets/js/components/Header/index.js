import React from "react";
import { Link, withRouter } from 'react-router-dom'
import "./header.scss";
import { connect } from 'react-redux'

const Header = (props) => {
  const { currentUser } = props;
  return (
    <div className="header-wrapper">
      <div className="main-container">
        <div className="left-content">
          <img className="main-logo" onClick={() => props.history.push('/')} src={'/images/bchat_logo.png'} alt=""/>
        </div>
        <div className="right-content">
          {currentUser ?
          <div className="user-info-wrapper">
            <p className="user-name">{currentUser.name}</p>
            <img className="user-image" src="/images/analyzing-people-3441040_1280.jpg" alt=""/>
          </div>
          :
          <React.Fragment>
            <Link className="login-button" to="/login"><h2>ログイン</h2></Link>
            <Link className="sign-up-button" to="/sign-up">始めましょう</Link>
          </React.Fragment>
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.authen.currentUser,
  }
}

export default withRouter(connect(mapStateToProps, null)(Header));
