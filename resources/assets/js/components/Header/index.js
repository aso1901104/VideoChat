import React, { Component } from "react";
import { Link } from 'react-router-dom'
import "./header.scss";

const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="main-container">
        <div className="left-content">
          <img className="main-logo" src={'/images/bchat_logo.png'} alt=""/>
        </div>
        <div className="right-content">
          <Link className="sign-up-button" to="/sign-up">始めましょう</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
