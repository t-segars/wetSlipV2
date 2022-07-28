import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { ToastContainer, toast } from 'react-toastify';

class MessageOwner extends React.Component {
  state = {
    message: '',
    time: new Date().toTimeString(),
    date: new Date().toDateString(),
    timestamp: new Date(),
    boatManufacturer: this.props.selectBoat.boatManufacturer,
    boatModel: this.props.selectBoat.boatModel,
    boatType: this.props.selectBoat.boatType,
    boatOwnerUID: this.props.selectBoat.uid,
    customerUID: this.props.currentUser.id,
    currentMessageUID: this.props.currentUser.id,
    messageIdentifier: this.props.currentUser.id,
  };

  handleSubmit = async () => {
    const db = firebase.database();
    if (this.state.message) {
      try {
        await db.ref('messages').push(this.state);
      } catch (error) {
        this.setState({ writeError: error.message });
      }
      toast.success('Message Sent', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  render() {
    console.log('state===>', this.state);
    console.log('time===>', this.state.time);
    return (
      <div className="select-boat-message-owner-container">
        <div className="select-boat-message-owner-container-left">
          <div className="select-boat-message-owner-container-avatar"></div>
          <div className="select-boat-message-owner-container-name">Stacy</div>
          <div className="select-boat-message-owner-container-city-and-age">
            <p style={{ display: 'inline' }}>New Bavaria 34</p>
            <p>Cruiser</p>
          </div>
        </div>
        <div className="select-boat-message-owner-container-right">
          <h1 className="select-boat-message-owner-enquiry">Your Enquiry</h1>
          <div className="select-boat-message-owner-departure">
            <div>
              <h3 className="select-boat-message-owner-departure-text">
                Departure Date
              </h3>
              <p className="select-boat-message-owner-departure-text-date">
                {this.props.bookingDetails.fromDate}
              </p>
            </div>

            <div>
              <h3 className="select-boat-message-owner-departure-text">
                Duration
              </h3>
              <p className="select-boat-message-owner-departure-text-date">
                {this.props.bookingDetails.bookingDays}
              </p>
            </div>

            <div>
              <h3 className="select-boat-message-owner-departure-text">
                Price
              </h3>
              <p className="select-boat-message-owner-departure-text-date">
                {this.props.bookingDetails.price}
              </p>
            </div>
          </div>
          <div
            style={{ marginTop: '17px', width: '80%', display: 'inline-block' }}
          >
            <p className="select-boat-message-owner-explain-text">
              Please explain your enquiry here, and the captain will respond to
              you asap
            </p>
          </div>
          <div className="select-boat-message-owner-input-container">
            <textarea
              className="select-boat-message-owner-input-name"
              type="text"
              placeholder="Enter your message here"
              style={{ height: '135px', paddingTop: '12px' }}
              onChange={(event) =>
                this.setState({ message: event.target.value })
              }
            />
          </div>
          <div className="select-boat-message-owner-button-container">
            <div className="select-boat-message-owner-button-align">
              <button
                className="select-boat-message-owner-cancel"
                onClick={this.props.messageCloseModal}
              >
                Cancel
              </button>
              <button
                className="select-boat-message-owner-send"
                onClick={this.handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookingDetails: state.bookingCard,
    selectBoat: state.selectBoat,
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(MessageOwner);
