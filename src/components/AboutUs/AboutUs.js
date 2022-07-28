import React from 'react';
import Footer from '../Footer/Footer';
import history from '../../history';
import ellipse1 from './Images/Ellipse1.png';

import './aboutUs.css';

class AboutUs extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="aboutUs-container">
        <div className="aboutUs-background-pic">
          <h1 className="aboutUs-background-header">About Us</h1>
        </div>
        <h1 className="aboutUs-background-welcome">Welcome to wetSlip</h1>
        <div
          style={{
            width: '80%',
            textAlign: 'center',
            display: 'inline-block',
            marginTop: '20px',
            marginBottom: '40px',
          }}
        >
          <p className="aboutUs-white-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non
          </p>
        </div>
        <div className="aboutUs-grey-background">
          <h1 className="aboutUs-grey-text-header">Our Mission</h1>
          <div
            style={{
              width: '80%',
              textAlign: 'center',
              display: 'inline-block',
              marginTop: '65px',
              marginBottom: '40px',
            }}
          >
            <p className="aboutUs-white-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non
            </p>
          </div>
        </div>
        <div className="aboutUs-join-us">
          <div className="aboutUs-join-us-align">
            <p className="aboutUs-join-us-text">
              Join us today to rent your dream boat
            </p>
            <button
              className="aboutUs-join-us-button"
              onClick={() => history.push('/signUp')}
            >
              Join
            </button>
          </div>
        </div>
        <div className="aboutUs-customers-reviews">
          <h1 className="aboutUs-customers-reviews-header">
            What our customers says
          </h1>
          <div className="aboutUs-customers-reviews-content">
            <div className="aboutUs-customers-reviews-content-card">
              <img
                src={ellipse1}
                alt="profile picture"
                className="aboutUs-customers-reviews-content-card-picture"
              />
              <p className="aboutUs-customers-reviews-content-card-name">
                Brown Jones
              </p>
              <div className="aboutUs-customers-reviews-content-card-review-container">
                <p className="aboutUs-customers-reviews-content-card-review">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut
                </p>
              </div>
              <p className="aboutUs-customers-reviews-content-card-location">
                Maimi
              </p>
            </div>
            <div
              className="aboutUs-customers-reviews-content-card"
              style={{ background: '#F6F6F6' }}
            >
              <img
                src={ellipse1}
                alt="profile picture"
                className="aboutUs-customers-reviews-content-card-picture"
              />
              <p className="aboutUs-customers-reviews-content-card-name">
                Brown Jones
              </p>
              <div className="aboutUs-customers-reviews-content-card-review-container">
                <p className="aboutUs-customers-reviews-content-card-review">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut
                </p>
              </div>
              <p className="aboutUs-customers-reviews-content-card-location">
                Maimi
              </p>
            </div>
            <div className="aboutUs-customers-reviews-content-card">
              <img
                src={ellipse1}
                alt="profile picture"
                className="aboutUs-customers-reviews-content-card-picture"
              />
              <p className="aboutUs-customers-reviews-content-card-name">
                Brown Jones
              </p>
              <div className="aboutUs-customers-reviews-content-card-review-container">
                <p className="aboutUs-customers-reviews-content-card-review">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut
                </p>
              </div>
              <p className="aboutUs-customers-reviews-content-card-location">
                Maimi
              </p>
            </div>
            <div
              className="aboutUs-customers-reviews-content-card"
              style={{ background: '#F6F6F6' }}
            >
              <img
                src={ellipse1}
                alt="profile picture"
                className="aboutUs-customers-reviews-content-card-picture"
              />
              <p className="aboutUs-customers-reviews-content-card-name">
                Brown Jones
              </p>
              <div className="aboutUs-customers-reviews-content-card-review-container">
                <p className="aboutUs-customers-reviews-content-card-review">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut
                </p>
              </div>
              <p className="aboutUs-customers-reviews-content-card-location">
                Maimi
              </p>
            </div>
          </div>
        </div>
        <div className="aboutUs-line"></div>
        <div style={{ marginTop: '29px' }}>
          <p className="help-content-more-help">
            For more help?{' '}
            <span
              className="help-content-more-help-contact-us"
              onClick={() => history.push('/contact')}
            >
              Contact us
            </span>{' '}
            today
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AboutUs;
