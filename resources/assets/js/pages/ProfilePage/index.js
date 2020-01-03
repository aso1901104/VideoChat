import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ProfilePage.scss';
import { setCurrentUser } from '../../actions/authen'
import { withRouter } from 'react-router-dom'

const ProfilePage = (props) => {
  return (
    <div className="profile-page-wrapper">
      Profile
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
