/* eslint-disable react/prop-types */
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './header.scss'
import { connect } from 'react-redux'

const ChatPageHeader = (props) => {
  const { currentUser } = props
  return (
    <div className="chat-page-header-wrapper">
      <div className="main-container">
        <div className="left-content">
          <img className="main-logo" onClick={() => props.currentUser ? props.history.push('/create-room') : props.history.push('/')} src={'/images/logopink.png'} alt=""/>
        </div>
        <div className="right-content">
          {currentUser
            ? (
              <div onClick={() => props.history.push('/profile')} className="user-info-wrapper">
                <p className="user-name">{currentUser.name}</p>
                <img className="user-image" src={currentUser.pic_path ? currentUser.pic_path : 'https://d2mx3cwqu0goya.cloudfront.net/common/f_f_object_123_s256_f_object_123_0bg.png'} alt=""/>
              </div>
            )
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

export default withRouter(connect(mapStateToProps, null)(ChatPageHeader))
