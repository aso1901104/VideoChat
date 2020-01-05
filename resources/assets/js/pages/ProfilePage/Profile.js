import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import './Profile.scss'
import { setCurrentUser } from '../../actions/authen'

const Profile = (props) => {
  const [selectedInput, setSelectedInput] = useState('')
  const currnetUserJson = JSON.stringify(props.currentUser) // renderを走らせる為に記述
  const copyRootCurrentUser = JSON.parse(currnetUserJson)
  const [currentUser, setCurrentUser] = useState(copyRootCurrentUser)
  const [isSubmit, setIsSubmit] = useState(false)
  const [errors, setErrors] = useState({})
  const updateUserData = () => {
    setErrors({})
    setIsSubmit(true)
    axios.post('/updateUserData', {
      name: currentUser.name,
      email: currentUser.email
    }).then((res) => {
      props.setCurrentUser()
      setIsSubmit(false)
    }).catch((e) => {
      setErrors(e.response.data.errors)
      setIsSubmit(false)
    })
  }
  const cancelData = (type) => {
    const json = JSON.stringify(currentUser) // renderを走らせる為に記述
    const copyCurrentUser = JSON.parse(json)
    switch (type) {
      case 'name':
        copyCurrentUser.name = props.currentUser.name
        break
      case 'email':
        copyCurrentUser.email = props.currentUser.email
        break
      default:
        break
    }

    setCurrentUser(copyCurrentUser)
  }
  return currentUser &&
    (
      <div className="profile-content-wrapper">
        <h1 className="main-title">Profile</h1>
        <div className="profile-data-wrapper">
          <img className="user-avator" src="https://lh3.googleusercontent.com/a-/AAuE7mArD_wUy4YxwxitGOmT-bIXTdOkua9g7mBsCxLe" />
          <div className="text-data">
            <p className="text-data-title">Name</p>
            <div className={isSubmit ? 'input-wrapper none-active' : selectedInput === 'name' ? 'input-wrapper selected-input' : 'input-wrapper'}>
              <input
                onFocus={() => setSelectedInput('name')}
                className="input-item"
                value={currentUser.name}
                placeholder="名前"
                disabled={isSubmit}
                onChange={(e) => {
                  currentUser.name = e.target.value
                  const json = JSON.stringify(currentUser) // renderを走らせる為に記述
                  const copyCurrentUser = JSON.parse(json)
                  setCurrentUser(copyCurrentUser)
                }}
              />
            </div>
            {'name' in errors && <p className="error-message">{errors.name}</p>}
            {
              props.currentUser.name !== currentUser.name &&
              (
                <div className="button-area">
                  <button
                    className="cancel-button"
                    onClick={() => cancelData('name')}
                  >
                    CANCEL
                  </button>
                  <button
                    className="save-button"
                    onClick={() => updateUserData()}
                  >
                    SAVE
                  </button>
                </div>
              )
            }
            <p className="text-data-title">Email</p>
            <div className={isSubmit ? 'input-wrapper none-active' : selectedInput === 'email' ? 'input-wrapper selected-input' : 'input-wrapper'}>
              <input
                onFocus={() => setSelectedInput('email')}
                className="input-item"
                type="email"
                placeholder="メールアドレス"
                disabled={isSubmit}
                value={currentUser.email}
                onChange={(e) => {
                  currentUser.email = e.target.value
                  const json = JSON.stringify(currentUser) // renderを走らせる為に記述
                  const copyCurrentUser = JSON.parse(json)
                  setCurrentUser(copyCurrentUser)
                }}
              />
            </div>
            {'email' in errors && <p className="error-message">{errors.email}</p>}
            {
              props.currentUser.email !== currentUser.email &&
              (
                <div className="button-area">
                  <button
                    className="cancel-button"
                    onClick={() => cancelData('email')}
                  >
                    CANCEL
                  </button>
                  <button
                    className="save-button"
                    onClick={() => updateUserData()}
                  >
                    SAVE
                  </button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: () => {
      dispatch(setCurrentUser())
    }
  }
}

export default connect(null, mapDispatchToProps)(Profile)
