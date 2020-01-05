/* eslint-disable react/prop-types */
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './header.scss'
import { connect } from 'react-redux'

const Header = (props) => {
  const { currentUser } = props
  return (
    <div className="header-wrapper">
      <div className="main-container">
        <div className="left-content">
          <img className="main-logo" onClick={() => props.currentUser ? props.history.push('/create-room') : props.history.push('/')} src={'/images/bchat_logo.png'} alt=""/>
        </div>
        <div className="right-content">
          {currentUser
            ? <div onClick={() => props.history.push('/profile')} className="user-info-wrapper">
              <p className="user-name">{currentUser.name}</p>
              <img className="user-image" src="https://lh3.googleusercontent.com/a-/AAuE7mArD_wUy4YxwxitGOmT-bIXTdOkua9g7mBsCxLe" alt=""/>
            </div>
            : <React.Fragment>
              <Link className="login-button" to="/login"><h2>ログイン</h2></Link>
              <Link className="sign-up-button" to="/sign-up">始めましょう</Link>
            </React.Fragment>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.authen.currentUser
  }
}

export default withRouter(connect(mapStateToProps, null)(Header))
