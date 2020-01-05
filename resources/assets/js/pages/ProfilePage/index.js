import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ProfilePage.scss';
import { withRouter } from 'react-router-dom';
import { setCurrentUser, removeCurrentUser } from '../../actions/authen';
import RequireAuthWrapper from '../../components/RequireAuthWrapper';
import Profile from './Profile';

const ProfilePage = RequireAuthWrapper((props) => {
  const [selectedPage, setSelectedPage] = useState('account');
  const logout = () => {
    axios.post('/user/logout').then(() => {
      props.removeCurrentUser();
      props.history.push('/login');
    });
  };
  return (
    <div className="profile-page-wrapper">
      <div className="side-menu">
        <ul className="list-wrapper">
          <li
            onClick={() => setSelectedPage('account')}
            className={selectedPage === 'account' ? 'active' : 'link-title'}
          >
            Account
          </li>
          <li
            onClick={() => {
              setSelectedPage('logout');
              logout();
            }}
            className={selectedPage === 'logout' ? 'active' : 'link-title'}
          >
            Log out
          </li>
        </ul>
      </div>
      <div className="main-content">
        {(() => {
          switch (selectedPage) {
            case 'account':
              return <Profile currentUser={props.authen.currentUser} />;
            case 'logout':
              return <p>LogOunt</p>;
          }
        })()}
      </div>
    </div>
  );
});


const mapStateToProps = (state) => ({
  authen: state.authen,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: () => {
    dispatch(setCurrentUser());
  },
  removeCurrentUser: () => {
    dispatch(removeCurrentUser());
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
