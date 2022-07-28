import React from 'react';
import ProfileNav from './ProfileNav/ProfileNav.js';
import PersonalProfile from './PersonalProfile/PersonalProfile';
import UploadPhoto from './UploadPhoto/UploadPhoto';
import BoatingQualification from './BoatingQualification/BoatingQualification';

import './captainProfileEdit.css';

import Footer from '../Footer/Footer';

class CaptainProfileEdit extends React.Component {
  state = {
    general: true,
    photos: false,
    boatingQualification: false,
    toDate: new Date(),
    clickToDay: true,
    dob: '',
    captain: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleCaptain = (bool) => {
    this.setState({ captain: bool });
  };

  handleClick = (name, value) => {
    if (name == 'general') {
      this.setState({ general: true });
      this.setState({ photos: false });
      this.setState({ boatingQualification: false });
    }
    if (name == 'photos') {
      this.setState({ general: false });
      this.setState({ photos: value });
      this.setState({ boatingQualification: false });
    }
    if (name == 'boatingQualification') {
      this.setState({ general: false });
      this.setState({ photos: false });
      this.setState({ boatingQualification: value });
    }
  };

  render() {
    return (
      <div className="captain-profile-edit-container">
        <ProfileNav />
        <div className="personal-profile-flex">
          <div className="personal-profile-left">
            <p className="personal-profile-text">Personal Profile</p>
            <div className="personal-profile-line"></div>
            <p
              className={
                this.state.general
                  ? 'personal-profile-sub-text-blue'
                  : 'personal-profile-sub-text'
              }
              onClick={() => this.handleClick('general', true)}
            >
              General
            </p>
            <p
              className={
                this.state.photos
                  ? 'personal-profile-sub-text-blue'
                  : 'personal-profile-sub-text'
              }
              onClick={() => this.handleClick('photos', true)}
            >
              Photos
            </p>
            <p
              className={
                this.state.boatingQualification
                  ? 'personal-profile-sub-text-blue'
                  : 'personal-profile-sub-text'
              }
              onClick={() => this.handleClick('boatingQualification', true)}
            >
              Boating Qualification
            </p>
          </div>
          <PersonalProfile handleGeneralClick={this.state.general} />
          <UploadPhoto handleGeneralClick={this.state.photos} />
          <BoatingQualification
            handleGeneralClick={this.state.boatingQualification}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default CaptainProfileEdit;
