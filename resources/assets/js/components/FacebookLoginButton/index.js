import React from 'react'
import { FaFacebook } from 'react-icons/fa'
import './FacebookLoginButton.scss'

const FacebookLoginButton = () => {
  const testFbLogin = () => {
    window.location.href = '/fblogin'
  }
  return (
    <div className="facebook-login-wrapper">
      <button className="facebook-login-button" onClick={() => testFbLogin()}>
        <FaFacebook className="icon" />
        <p>Facebookでログイン</p>
      </button>
    </div>
  )
}

export default FacebookLoginButton
