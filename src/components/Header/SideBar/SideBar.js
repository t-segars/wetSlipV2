import React from 'react';
import { Link } from 'react-router-dom';
import cancelIcon from './icons8-cancel.svg';
import history from '../../../history';

import './sidebar.css';

class SideBar extends React.Component {
  state = { visible: false };
  visible = () => {
    if (this.props.isVisible) {
      return 'visible';
    } else {
      return '';
    }
  };

  handleDropDown = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    console.log('authprops===>', this.props.auth);
    return (
      <div
        className={`ui sidebar ${this.visible()} inverted overlay animating right vertical menu`}
      >
        <img
          src={cancelIcon}
          alt="cancel icon"
          onClick={this.props.handleClick}
          className="cancel"
        />
        {this.props.currentUser ? (
          <div className="sidebar-items">
            <div
              className="item"
              onClick={async () => {
                await this.props.handleClick();
                history.push('/help');
              }}
            >
              Help
            </div>
            <div
              className="item"
              onClick={() => {
                this.handleDropDown();
              }}
            >
              My Account
              <div
                className={this.state.visible ? 'sub-item-display' : 'sub-item'}
              >
                <div
                  className="item"
                  onClick={async () => {
                    await this.props.handleClick();
                    history.push('/dashboard');
                  }}
                >
                  Dashboard
                </div>
                <div
                  className="item"
                  onClick={async () => {
                    await this.props.handleClick();
                    history.push('/message');
                  }}
                >
                  Message
                </div>
                <div
                  className="item"
                  onClick={async () => {
                    await this.props.handleClick();
                    history.push('/bookings');
                  }}
                >
                  Bookings
                </div>
                <div
                  className="item"
                  onClick={async () => {
                    await this.props.handleClick();
                    history.push('/profile/edit');
                  }}
                >
                  Profile
                </div>
                <div
                  className="item"
                  onClick={async () => {
                    await this.props.handleClick();
                    history.push('/boats');
                  }}
                >
                  Boats
                </div>
                <div
                  className="item"
                  onClick={async () => {
                    await this.props.handleClick();
                    history.push('/settings');
                  }}
                >
                  Settings
                </div>
              </div>
            </div>

            <div
              className="item"
              onClick={async () => {
                await this.props.handleClick();
                history.push('/listaboat');
              }}
            >
              List a Boat
            </div>
            <div
              className="item"
              onClick={async () => {
                await this.props.auth.signOut();
                await this.props.handleClick();
                history.push('/');
              }}
            >
              Sign Out
            </div>
          </div>
        ) : (
          <div className="sidebar-items">
            <div
              className="item"
              onClick={async () => {
                await this.props.handleClick();
                history.push('/login');
              }}
            >
              Sign In
            </div>
            <div
              className="item"
              onClick={async () => {
                await this.props.handleClick();
                history.push('/signup');
              }}
            >
              Sign Up
            </div>
            <div
              className="item"
              onClick={async () => {
                await this.props.handleClick();
                history.push('/help');
              }}
            >
              Help
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SideBar;
