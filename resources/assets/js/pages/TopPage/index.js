import React, {Component, useState} from "react";
import { Link } from 'react-router-dom';
import './topPage.scss'

import { connect } from 'react-redux';

const TopPage = (props) => {
  if (props.authen.currentUser !== null) {
    props.history.push('/create-room')
    props.history.push('/login')
  }
  return (
  <div className="top-page-wrapper">
    <div className="left-content">
      <img className="top-page-main-image" src={'/images/face-535769_1920.jpg'} alt="" />
    </div>
    <div className="right-content">
      <div className="sentence-area">
        <h1 className="text-main">ビジネス向けの簡単なビデオ会議</h1>
        <h2 className="text-sub">柔軟なビデオ会議でチームとクライアントを結び付けます。</h2>
        <Link className="sign-up-button" to="/sign-up">
          始めましょう
        </Link>
      </div>
    </div>
  </div>
  )
}

const mapStateToProps = state => {
  return {
    authen: state.authen,
  }
};

export default connect(mapStateToProps, null)(TopPage);
