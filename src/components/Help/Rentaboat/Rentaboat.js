import React from 'react';
import boat1 from '../images/boat1.png';
import boat2 from '../images/boat2.png';
import boat3 from '../images/boat3.png';

const Rentaboat = ({ rentABoatDisplay }) => {
  return (
    <>
      {rentABoatDisplay ? (
        <>
          <div className="help-content-grid">
            <img src={boat1} alt="boat photo" className="help-content-boat1" />
            <div className="help-content-search-and-filter">
              <h1 className="help-content-search-and-filter-header">
                Search and filter
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
                Select boat from list
              </h1>
              <p className="help-content-search-and-filter-content">
                sectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>
            </div>
            <img src={boat2} alt="boat photo" className="help-content-boat1" />
          </div>
          <div className="help-content-grid">
            <img src={boat3} alt="boat photo" className="help-content-boat1" />
            <div className="help-content-search-and-filter">
              <h1 className="help-content-search-and-filter-header">
                Book or chat with the captain
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
    </>
  );
};
export default Rentaboat;
