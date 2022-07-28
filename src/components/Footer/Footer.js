import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.svg';
import downloadFromAppStore from './images/appStoreDownload.svg';
import downloadFromPlayStore from './images/playstoreDownload.svg';
import facebookIcon from './images/facebook.svg';
import instagramIcon from './images/instagram.svg';
import twitterIcon from './images/twitter.svg';
import linkedInIcon from './images/linkedin.svg';

import './footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-container-align">
        <div className="footer-content">
          <div className="footer-content-hireaboat-icon">
            <img
              src={logo}
              alt="logo"
              style={{
                float: 'left',
                cursor: 'pointer',
              }}
            />
            <img
              src={downloadFromAppStore}
              alt="download on app store"
              style={{
                float: 'left',
                width: '153px',
                height: '47px',
                cursor: 'pointer',
                marginTop: '26.41px',
              }}
            />
            <img
              src={downloadFromPlayStore}
              alt="download on play store"
              style={{
                float: 'left',
                width: '153px',
                height: '47px',
                cursor: 'pointer',
                marginTop: '16px',
              }}
            />
          </div>
          <div className="footer-content-hireaboat-icon company">
            <div>
              <div to="" className="footer-h4-text-style">
                COMPANY
              </div>
            </div>
            <div style={{ marginTop: '22px' }}>
              <Link to="/aboutus" className="footer-p-text-style">
                About Us
              </Link>
            </div>
            <div style={{ marginTop: '7px' }}>
              <Link to="/help" className="footer-p-text-style">
                FAQ
              </Link>
            </div>
            <div style={{ marginTop: '7px' }}>
              <Link to="/contact" className="footer-p-text-style">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="footer-content-hireaboat-icon discover">
            <div>
              <Link to="" className="footer-h4-text-style">
                DISCOVER
              </Link>
            </div>
            <div style={{ marginTop: '22px' }}>
              <Link to="" className="footer-p-text-style">
                How it works
              </Link>
            </div>
            <div style={{ marginTop: '7px' }}>
              <Link to="" className="footer-p-text-style">
                Boats
              </Link>
            </div>
            <div style={{ marginTop: '7px' }}>
              <Link to="" className="footer-p-text-style">
                Rent your boat
              </Link>
            </div>
          </div>
          <div className="footer-content-hireaboat-icon join-us">
            <div className="footer-h4-text-style">JOIN US ON</div>
            <div
              style={{
                marginTop: '22px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Link to="" className="">
                <img src={facebookIcon} />
              </Link>
              <Link to="" className="">
                <img src={instagramIcon} />
              </Link>
              <Link to="" className="">
                <img src={twitterIcon} />
              </Link>
              <Link to="" className="">
                <img src={linkedInIcon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
