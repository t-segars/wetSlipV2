import React from 'react';
import { Link } from 'react-router-dom';

class ProfileNav extends React.Component {
  state = {
    values: {
      dashboard: false,
      message: false,
      trips: false,
      profile: false,
      boats: false,
      settings: false,
    },
  };

  handleNavClick = (name, value) => {
    if (name === 'dashboard') {
      this.setState({ dashboard: value });
      this.setState({ message: false });
      this.setState({ trips: false });
      this.setState({ profile: false });
      this.setState({ boats: false });
      this.setState({ settings: false });
    }
    if (name === 'message') {
      this.setState({ dashboard: false });
      this.setState({ message: value });
      this.setState({ trips: false });
      this.setState({ profile: false });
      this.setState({ boats: false });
      this.setState({ settings: false });
    }

    if (name === 'trips') {
      this.setState({ dashboard: false });
      this.setState({ message: false });
      this.setState({ trips: value });
      this.setState({ profile: false });
      this.setState({ boats: false });
      this.setState({ settings: false });
    }

    if (name === 'profile') {
      this.setState({ dashboard: false });
      this.setState({ message: false });
      this.setState({ trips: false });
      this.setState({ profile: value });
      this.setState({ boats: false });
      this.setState({ settings: false });
    }

    if (name === 'boats') {
      this.setState({ dashboard: false });
      this.setState({ message: false });
      this.setState({ trips: false });
      this.setState({ profile: false });
      this.setState({ boats: value });
      this.setState({ settings: false });
    }
    if (name === 'settings') {
      this.setState({ dashboard: false });
      this.setState({ message: false });
      this.setState({ trips: false });
      this.setState({ profile: false });
      this.setState({ boats: false });
      this.setState({ settings: value });
    }
  };

  render() {
    return (
      <div className="profileNav-container">
        <div className="profileNav-align">
          <div className="profileNav-bar-flex">
            <Link
              to="/dashboard"
              className={
                this.state.dashboard
                  ? 'profileNav-bar-dashboard-ash'
                  : 'profileNav-bar-dashboard'
              }
              onClick={() => this.handleNavClick('dashboard', true)}
            >
              Dashboard
            </Link>
            <Link
              to="/message"
              className={
                this.state.message
                  ? 'profileNav-bar-dashboard-ash'
                  : 'profileNav-bar-dashboard'
              }
              onClick={() => this.handleNavClick('message', true)}
            >
              Message
            </Link>
            <Link
              to="/bookings"
              className={
                this.state.trips
                  ? 'profileNav-bar-dashboard-ash'
                  : 'profileNav-bar-dashboard'
              }
              onClick={() => this.handleNavClick('trips', true)}
            >
              Bookings
            </Link>
            <Link
              to="/profile/edit"
              className={
                this.state.profile
                  ? 'profileNav-bar-dashboard-ash'
                  : 'profileNav-bar-dashboard'
              }
              onClick={() => this.handleNavClick('profile', true)}
            >
              Profile
            </Link>
            <Link
              to="/boats"
              className={
                this.state.boats
                  ? 'profileNav-bar-dashboard-ash'
                  : 'profileNav-bar-dashboard'
              }
              onClick={() => this.handleNavClick('boats', true)}
            >
              Boats
            </Link>
            <Link
              to="/settings"
              className={
                this.state.settings
                  ? 'profileNav-bar-dashboard-ash'
                  : 'profileNav-bar-dashboard'
              }
              onClick={() => this.handleNavClick('settings', true)}
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileNav;
