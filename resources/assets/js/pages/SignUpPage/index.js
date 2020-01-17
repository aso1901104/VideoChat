/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './SignUpPage.scss'
import { setCurrentUser } from '../../actions/authen'
import { withRouter } from 'react-router-dom'
import ErrorMessages from '../../components/ErrorMessages'

import FacebookLoginButton from '../../components/FacebookLoginButton'

const SignUpPage = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    props.authen.currentUser && props.history.goBack()
  })

  const register = () => {
    setErrors([])
    axios.post('/user/register', {
      name,
      email,
      password
    }).then((res) => {
      props.setCurrentUser()
    }).catch((e) => {
      setErrors(e.response.data.errors)
    })
  }
  return (
    <div className="sign-up-page-wrapper">
      <div className="sign-up-form-wrapper">
        <h2 className="sign-up-title">Sign Up</h2>
        <FacebookLoginButton />
        {window.facebookLoginError && ErrorMessages(window.facebookLoginError)}
        <h3 className="input-title">Name</h3>
        <div className="input-wrapper">
          <input className="sign-up-input" type="text" placeholder="氏名" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <h3 className="input-title">Email</h3>
        <div className="input-wrapper">
          <input className="sign-up-input" type="email" placeholder="メールアドレス" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <h3 className="input-title">Password</h3>
        <div className="input-wrapper">
          <input className="sign-up-input" type="password"　placeholder="パスワード" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {errors.length !== 0 && ErrorMessages(errors)}
        <button className="sign-up-button" onClick={() => register()}>
          登録
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    authen: state.authen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: () => {
      dispatch(setCurrentUser())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpPage))
