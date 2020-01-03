import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ProfilePage.scss';
import { setCurrentUser } from '../../actions/authen'
import { withRouter } from 'react-router-dom'

const ProfilePage = (props) => {
  const [selectedPage, setSelectedPage] = useState('account')
  return (
    <div className="profile-page-wrapper">
      <div className="side-menu">
        <ul className="list-wrapper">
          <li onClick={() => setSelectedPage('account')} className="link-title">Account</li>
          <li onClick={() => setSelectedPage('logout')} className="link-title">Log out</li>
        </ul>
      </div>
      <div className="main-content">
        {(() => {
          switch (selectedPage) {
            case 'account':
              return <p>Account</p>
            case 'logout':
              return <p>LogOunt</p>
          }
        })()}
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage))
