/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './loginPage.scss'
import { setCurrentUser } from '../../actions/authen'
import { withRouter } from 'react-router-dom'
import ErrorMessages from '../../components/ErrorMessages'

const LoginPage = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    props.authen.currentUser && props.history.goBack()
  })

  const login = () => {
    setErrors([])
    axios.post('/user/login', {
      email,
      password,
      remember: true
    }).then((res) => {
      props.setCurrentUser()
    }).catch((e) => {
      setErrors(e.response.data.errors)
    })
  }
  return (
    <div className="login-page-wrapper">
      <div className="login-form-wrapper">
        <h2 className="login-title">Login</h2>
        <h3 className="input-title">Email</h3>
        <div className="input-wrapper">
          <input className="login-input" type="email" placeholder="メールアドレス" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <h3 className="input-title">Password</h3>
        <div className="input-wrapper">
          <input className="login-input" type="password" placeholder="パスワード" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {errors.length !== 0 && ErrorMessages(errors)}
        <button className="login-button" onClick={() => login()}>
          ログイン
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage))
