import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';

import Footer from '../../Footer/Footer';

import './passwordReset.css';

class PasswordReset extends React.Component {
  state = {};

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="captain-profile-edit-container">
        <ProfileNav />
        <div className="personal-profile-flex">
          <div className="personal-profile-left">
            <p className="personal-profile-text">Settings</p>
            <div className="personal-profile-line"></div>
            <p
              className={
                this.state.general
                  ? 'personal-profile-sub-text-blue'
                  : 'personal-profile-sub-text'
              }
              style={{ color: '#39A0ED' }}
            >
              Reset Password
            </p>
          </div>
          <div
            className="personal-profile-right-container"
            style={{ minHeight: '200px', width: '70%' }}
          >
            <div className="personal-information-header">
              <h1 className="personal-information-header-text">
                Reset Password
              </h1>
            </div>
            <div
              className="personal-information-body"
              style={{
                padding: '27px 5%',
                minHeight: '100px',

                position: 'relative',
              }}
            ></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PasswordReset;
