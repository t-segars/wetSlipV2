import React from 'react';
import history from '../../history';
import { connect } from 'react-redux';
import { selectBoat } from '../../actions/';
import ImageSlider from './ImageSlider';
import cabinIcon from './images/bedIcon.svg';
import bathIcon from './images/bathIcon.svg';
import lengthIcon from './images/lengthIcon.svg';
import guestIcon from './images/guestIcon.svg';
import BookingCard from './BookingCard';
import ReactModal from 'react-modal';
import cancelIconWhite from './images/cancelIconWhite.svg';
import SimilarBoatCard from './SimilarBoatCard';
import Footer from '../Footer/Footer';
import MessageOwner from './MessageOwner';

import './selectBoat.css';

ReactModal.setAppElement('#root');

class SelectBoat extends React.Component {
  state = {
    modalIsOpen: false,
    messageModalIsOpen: false,
    fromDate: null,
  };

  componentDidMount() {
    this.props.selectBoat();

    window.scrollTo(0, 0);
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  messageCloseModal = () => {
    this.setState({ messageModalIsOpen: false });
  };

  messageOpenModal = () => {
    this.setState({ messageModalIsOpen: true });
  };

  handleFromDate = (date) => {
    this.setState({ fromDate: date });
  };

  render() {
    const {
      boatManufacturer,
      boatModel,
      captain,
      numberOfCabins,
      numberOfBathrooms,
      lengthOfBoats,
      boatCapacity,
      dailyBookingPrice,
      boatDescription,
    } = this.props.selectBoatState;

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };
    console.log('selectBoatState', this.props.selectBoatState);
    return (
      <div className="select-boat-container">
        <div>
          <ReactModal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
          >
            <BookingCard
              dailyBookingPrice={dailyBookingPrice}
              handleFromDate={() => this.handleFromDate}
              messageOpenModal={this.messageOpenModal}
            />
            <div
              style={{ position: 'absolute', left: '88%', top: '3%' }}
              onClick={this.closeModal}
            >
              <img
                src={cancelIconWhite}
                alt="cancel icon"
                style={{ width: '30px', height: '30px', cursor: 'pointer' }}
              />
            </div>
          </ReactModal>
        </div>
        <div>
          <ReactModal
            isOpen={this.state.messageModalIsOpen}
            onRequestClose={this.messageCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
          >
            <MessageOwner
              dailyBookingPrice={dailyBookingPrice}
              messageCloseModal={this.messageCloseModal}
            />
            <div
              style={{ position: 'absolute', left: '88%', top: '3%' }}
              onClick={this.messageCloseModal}
            >
              <img
                src={cancelIconWhite}
                alt="cancel icon"
                style={{ width: '30px', height: '30px', cursor: 'pointer' }}
              />
            </div>
          </ReactModal>
        </div>
        <div className="select-boat-mobile-booking">
          <div className="select-boat-mobile-booking-align">
            <button
              className="select-boat-description-booking-card-book-now-btn"
              style={{
                width: '42%',
                marginLeft: '5%',
                marginTop: '0px',
                opacity: '0.9',
              }}
              onClick={this.openModal}
            >
              Book Now
            </button>
            <button
              className="select-boat-description-booking-card-message-owner-btn"
              style={{
                width: '42%',
                marginRight: '5%',
                marginTop: '0px',
                opacity: '0.9',
              }}
              onClick={this.messageOpenModal}
            >
              Message Owner
            </button>
          </div>
        </div>
        <div className="select-boat-image-container">
          <ImageSlider selectBoat={this.props.selectBoatState} />
        </div>
        {/* booking for mobile devices */}

        <div className="select-boat-align">
          <div className="select-boat-profile-details">
            <div className="select-boat-profile-details-rating-container">
              <div className="select-boat-profile-details-pic">
                {/* <img alt="profile picture" src={}/> */}
              </div>
              <div className="select-boat-profile-details-rating">
                <h3 className="select-boat-profile-details-name">
                  {`${boatManufacturer} ${boatModel}`}
                </h3>
                {captain === 'With Captain' ? (
                  <p className="select-boat-profile-details-captain">
                    Boat comes with captain
                  </p>
                ) : (
                  <p className="select-boat-profile-details-captain">
                    Boat comes without captain
                  </p>
                )}
              </div>
            </div>

            <div className="select-boat-description">
              <div className="select-boat-description-left">
                <div className="select-boat-description-left-separator-line"></div>
                <div className="select-boat-description-specs-container">
                  <div
                    className="select-boat-description-cabin-container"
                    style={{ marginTop: '6px' }}
                  >
                    <img
                      src={cabinIcon}
                      alt="cabin logo"
                      style={{ display: 'inline-block' }}
                    />
                    <p className="select-boat-description-cabin-container-text">{`${numberOfCabins} cabins`}</p>
                  </div>
                  <div className="select-boat-description-cabin-container">
                    <img
                      src={bathIcon}
                      alt="cabin logo"
                      style={{ display: 'inline-block' }}
                    />
                    <p className="select-boat-description-cabin-container-text">{`${numberOfBathrooms} bathrooms`}</p>
                  </div>
                  <div className="select-boat-description-cabin-container">
                    <img
                      src={lengthIcon}
                      alt="cabin logo"
                      style={{ display: 'inline-block' }}
                    />
                    <p className="select-boat-description-cabin-container-text">{`${lengthOfBoats} m`}</p>
                  </div>
                  <div className="select-boat-description-cabin-container">
                    <img
                      src={guestIcon}
                      alt="cabin logo"
                      style={{ display: 'inline-block' }}
                    />
                    <p className="select-boat-description-cabin-container-text">{`${boatCapacity} m`}</p>
                  </div>
                </div>
                <div className="select-boat-description-left-separator-line"></div>
                <div className="select-boat-description-details-container">
                  <div className="select-boat-description-details-description">
                    <div style={{ display: 'inline-block', width: '100%' }}>
                      <h3 className="select-boat-description-details-description-heading">
                        Description
                      </h3>

                      <div className="select-boat-description-details-description-body">
                        {boatDescription}
                        <div className="select-boat-description-left-separator-line1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="select-boat-description-details-captain">
                    <div className="select-boat-description-details-description">
                      <div style={{ display: 'inline-block', width: '100%' }}>
                        <h3 className="select-boat-description-details-description-heading">
                          Boat Captain
                        </h3>

                        <div className="select-boat-description-details-description-body">
                          {/* Render Captain Details */}
                          <div className="select-boat-description-left-separator-line1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="select-boat-description-details-reviews-comments">
                    <div className="select-boat-description-details-description">
                      <div style={{ display: 'inline-block', width: '100%' }}>
                        <h3 className="select-boat-description-details-description-heading">
                          Reviews (0)
                        </h3>

                        <div className="select-boat-description-details-description-body">
                          {/* Render Reviews */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="select-boat-description-right">
                <BookingCard
                  dailyBookingPrice={dailyBookingPrice}
                  handleFromDate={() => this.handleFromDate}
                  messageOpenModal={this.messageOpenModal}
                />
              </div>
            </div>
          </div>
          <div className="select-boat-description-left-separator-last-line"></div>
          <div className="select-boat-description-details-similar-boats">
            <div className="select-boat-description-details-description">
              <div style={{ display: 'inline-block', width: '100%' }}>
                <h3 className="select-boat-description-details-description-heading">
                  Similar Boats
                </h3>

                <div className="select-boat-description-details-description-body">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}
                  >
                    {this.props.similarBoats.map((data, index) => {
                      return this.props.selectBoatState === data ? null : (
                        <SimilarBoatCard
                          data={data}
                          key={data._id}
                          key={index}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectBoatState: state.selectBoat,
    similarBoats: state.similarBoats,
  };
};

export default connect(mapStateToProps, { selectBoat })(SelectBoat);
