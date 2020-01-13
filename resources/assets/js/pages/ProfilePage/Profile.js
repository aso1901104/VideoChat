import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import './Profile.scss'
import { setCurrentUser } from '../../actions/authen'

const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL

const Profile = (props) => {
  const [selectedInput, setSelectedInput] = useState('')
  const [currentUser, setCurrentUser] = useState(props.currentUser)
  const [isSubmit, setIsSubmit] = useState(false)
  const [errors, setErrors] = useState({})
  const [imageUri, setImageUri] = useState(null)
  const [selectedImageFile, setSelectedImageFile] = useState(null)
  useEffect(() => {
    setCurrentUser(props.currentUser)
  }, [props.currentUser])
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
  const imageChange = (event) => {
    const files = event.target.files
    const imageUri = createObjectURL(files[0])
    setSelectedImageFile(files[0])
    const json = JSON.stringify(currentUser) // renderを走らせる為に記述
    const copyCurrentUser = JSON.parse(json)
    copyCurrentUser.pic_path = null
    setCurrentUser(copyCurrentUser)
    setImageUri(imageUri)
  }
  const uploadImage = () => {
    const json = JSON.stringify(currentUser) // renderを走らせる為に記述
    const copyCurrentUser = JSON.parse(json)
    setImageUri(copyCurrentUser.pic_path)
    copyCurrentUser.pic_path = null
    setCurrentUser(copyCurrentUser)
    const formData = new FormData()
    formData.append('img', selectedImageFile)
    axios.post('/uploadImage', formData).then((res) => {
      const json = JSON.stringify(currentUser) // renderを走らせる為に記述
      const copyCurrentUser = JSON.parse(json)
      copyCurrentUser.pic_path = res.data.url
      setCurrentUser(copyCurrentUser)
      setImageUri(null)
      props.setCurrentUser()
    })
  }
  return currentUser &&
    (
      <div className="profile-content-wrapper">
        <h1 className="main-title">Profile</h1>
        <div className="profile-data-wrapper">
          <div className="user-avator-wrapper">
            <img className="user-avator" src={
              currentUser.pic_path && imageUri === null
                ? `${currentUser.pic_path}`
                : imageUri
                  ? `${imageUri}`
                  : 'https://d2mx3cwqu0goya.cloudfront.net/common/f_f_object_123_s256_f_object_123_0bg.png'}
            />
            {
              (imageUri === null &&
                (
                  <div className="button-wrapper">
                    <label className="upload-user-avator-label" htmlFor="upload-user-avator">
                      Upload Image
                      <input
                        id="upload-user-avator"
                        accept="image/*"
                        type="file"
                        className="upload-image-button"
                        onChange={(e) => imageChange(e)}
                      />
                    </label>
                  </div>
                )
              ) ||
                (
                  <div className="button-flex-wrapper">
                    <button
                      className="save-button"
                      onClick={() => uploadImage()}
                    >
                      SAVE
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => setImageUri(null)}
                    >
                      CANCEL
                    </button>
                  </div>
                )
            }

          </div>
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

const mapStateToProps = state => {
  return {
    currnetUser: state.authen.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: () => {
      dispatch(setCurrentUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
