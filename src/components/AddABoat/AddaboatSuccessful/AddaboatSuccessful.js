import React from 'react';
import Footer from '../../Footer/Footer';
import './addaboatsuccessful.css';

class AddaboatSuccessful extends React.Component {
  render() {
    return (
      <div className="addaboat-successful-container">
        <div className="addaboat-successful-container-submitted-bar">
          <p className="addaboat-successful-container-submitted-bar-text">
            Submitted Successfully
          </p>
        </div>
        <div className="addaboat-successful-container-being-processed-container">
          <p className="addaboat-successful-container-being-processed">
            Your submission is being processed, we will get back to you shortly
          </p>
        </div>
        <div className="addaboat-successful-container-being-monitor-container">
          <p className="addaboat-successful-container-being-monitor">
            You can monitor your boat status from your dashboard
          </p>
        </div>
        <div>
          <button className="addaboat-successful-button">Dashboard</button>
        </div>

        <Footer />
      </div>
    );
  }
}

export default AddaboatSuccessful;
