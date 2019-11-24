import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './loginPage.scss';
import { setCurrentUser } from '../../actions/authen'

const LoginPage = ({ authen, setCurrentUser }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    axios.post('/user/login', {
      email,
      password,
    }).then((res) => {
      setCurrentUser()
    }).catch((e) => {
      console.log(e)
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
          <input className="login-input" type="password"　placeholder="パスワード" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button className="login-button" onClick={() => login()}>
          ログイン
        </button>
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    authen: state.authen,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: () => {
      dispatch(setCurrentUser())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
