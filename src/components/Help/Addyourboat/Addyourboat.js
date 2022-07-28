import React from 'react';
import boat4 from '../images/boat4.png';
import boat5 from '../images/boat5.png';
import boat6 from '../images/boat6.png';

const Addyourboat = ({ addYourBoatDisplay }) => {
  return (
    <div>
      {addYourBoatDisplay ? (
        <>
          <div className="help-content-grid">
            <img src={boat4} alt="boat photo" className="help-content-boat1" />
            <div className="help-content-search-and-filter">
              <h1 className="help-content-search-and-filter-header">
                Select your boat
              </h1>
              <p className="help-content-search-and-filter-content">
                sectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>
            </div>
          </div>
          <div className="help-content-grid">
            <div className="help-content-search-and-filter">
              <h1 className="help-content-search-and-filter-header">
                List your full description
              </h1>
              <p className="help-content-search-and-filter-content">
                sectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>
            </div>
            <img src={boat5} alt="boat photo" className="help-content-boat1" />
          </div>
          <div className="help-content-grid">
            <img src={boat6} alt="boat photo" className="help-content-boat1" />
            <div className="help-content-search-and-filter">
              <h1 className="help-content-search-and-filter-header">
                See your bookings
              </h1>
              <p className="help-content-search-and-filter-content">
                sectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>
            </div>
          </div>{' '}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default Addyourboat;
