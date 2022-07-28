import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';
import Bookings from './Bookings/Bookings';

import Boat from './Boats/Boats';

import Footer from '../../Footer/Footer';

import './boats.css';

class Boats extends React.Component {
  state = {
    general: true,
    photos: false,
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
    }
    if (name == 'photos') {
      this.setState({ general: false });
      this.setState({ photos: value });
    }
    if (name == 'boatingQualification') {
      this.setState({ general: false });
      this.setState({ photos: false });
    }
  };

  render() {
    return (
      <div className="captain-profile-edit-container">
        <ProfileNav />
        <div className="personal-profile-flex">
          <div className="personal-profile-left">
            <p className="personal-profile-text">Boats account</p>
            <div className="personal-profile-line"></div>
            <p
              className={
                this.state.general
                  ? 'personal-profile-sub-text-blue'
                  : 'personal-profile-sub-text'
              }
              onClick={() => this.handleClick('general', true)}
            >
              Bookings
            </p>
            <p
              className={
                this.state.photos
                  ? 'personal-profile-sub-text-blue'
                  : 'personal-profile-sub-text'
              }
              onClick={() => this.handleClick('photos', true)}
            >
              Boats
            </p>
          </div>
          <Bookings handleGeneralClick={this.state.general} />
          <Boat handleGeneralClick={this.state.photos} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Boats;
