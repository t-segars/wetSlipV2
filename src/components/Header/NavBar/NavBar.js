import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import SideBar from '../SideBar/SideBar';
import burgerMenu from './icons8-menu.svg';
import { auth } from '../../../firebase/firebase';

import './navbar.css';
import history from '../../../history';

class NavBar extends React.Component {
  state = { visible: false, dimmed: false };

  handleClick = (e) => {
    if (this.state.visible) {
      this.setState({ visible: false });
    } else {
      this.setState({ visible: true });
    }
  };

  isDimmed = () => {
    if (this.state.visible) {
      return 'dimmed';
    } else {
      return '';
    }
  };

  render() {
    return (
      <div>
        <div>
          <div className="ui tiny menu">
            <Link to="/" className="ui hamburger small image">
              <img src={logo} alt="logo" className="logo" />
            </Link>
            <div className="hamburger right menu" onClick={this.handleClick}>
              <img src={burgerMenu} className="hamburger-icon" />
            </div>
          </div>
          <SideBar
            isVisible={this.state.visible}
            handleClick={() => this.handleClick()}
            currentUser={this.props.currentUser}
            auth={auth}
          />
          <div
            className={`pusher ${this.isDimmed()}`}
            onClick={this.handleClick}
          ></div>
        </div>
        {this.props.currentUser ? (
          <div className="ui large menu" style={{ marginTop: '0px' }}>
            <Link to="/" className="ui fullscreen small image">
              <img src={logo} alt="logo" className="logo" />
            </Link>

            <div className="fullscreen right menu">
              <Link to="/help" className="item item3">
                Help
              </Link>
              <Link to="/dashboard" className="item item2">
                My Account
              </Link>

              <div
                className="item item2"
                onClick={async () => {
                  await auth.signOut();
                  history.push('/');
                }}
              >
                Sign Out
              </div>
              <Link to="/listaboat" className="item">
                <div className="ui primary button">List a Boat</div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="ui large menu" style={{ marginTop: '0px' }}>
            <Link to="/" className="ui fullscreen small image">
              <img src={logo} alt="logo" className="logo" />
            </Link>

            <div className="fullscreen right menu">
              <Link to="/login" className="item item1">
                Sign In
              </Link>
              <Link to="/signUp" className="item item2">
                Sign Up
              </Link>
              <Link to="/help" className="item item3">
                Help
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NavBar;
