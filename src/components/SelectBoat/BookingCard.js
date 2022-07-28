import React from 'react';
import history from '../../history';
import { connect } from 'react-redux';
import { bookingCard } from '../../actions';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class BookingCard extends React.Component {
  state = {
    fromDate: new Date(),
    toDate: new Date(),
    clickToDay: true,
    clickFromDay: true,
    bookingDays: '',
  };

  componentDidUpdate() {
    const renderBookingDays =
      this.state.toDate.getDate() - this.state.fromDate.getDate() === 0
        ? 1
        : Math.ceil(
            (this.state.toDate.getTime() - this.state.fromDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );

    const price =
      this.state.toDate.getDate() - this.state.fromDate.getDate() === 0
        ? 1 * this.props.dailyBookingPrice
        : Math.ceil(
            (this.state.toDate.getTime() - this.state.fromDate.getTime()) /
              (1000 * 60 * 60 * 24)
          ) * this.props.dailyBookingPrice;

    this.props.bookingCard(
      this.state.fromDate.toLocaleDateString(),
      this.state.toDate.toLocaleDateString(),
      renderBookingDays,
      price
    );
  }

  onChangeTo = (date) => this.setState({ toDate: date });
  onChangeFrom = (date) => this.setState({ fromDate: date });

  render() {
    console.log('bookingdays==>', this.state.bookingDays);
    const { dailyBookingPrice } = this.props;
    return (
      <div className="select-boat-description-booking-card-container">
        <div className="select-boat-description-booking-card">
          <div className="select-boat-description-booking-card-title">
            <div
              style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'space-between',
                marginLeft: '26px',
                marginTop: '10px',
              }}
            >
              <div style={{ width: '60%', float: 'left' }}>
                <p className="select-boat-description-booking-card-price">{`From $${dailyBookingPrice}`}</p>
              </div>
              <div
                style={{
                  width: '30%',

                  float: 'left',
                }}
              >
                <p className="select-boat-description-booking-card-perday">
                  per day
                </p>
              </div>
            </div>
          </div>
          <div className="select-boat-description-booking-card-dates-container">
            <div className="select-boat-description-booking-card-dates-align">
              <div style={{ marginTop: '16px', float: 'left' }}>
                <p>Select dates:</p>
              </div>
              <div className="select-boat-description-booking-card-dates">
                <div style={{ width: '40%' }}>
                  <label className="select-boat-description-booking-card-dates-label">
                    From
                  </label>
                  <div
                    className="select-boat-description-booking-card-dates-from"
                    style={{ position: 'relative' }}
                    onFocus={() => this.setState({ clickFromDay: false })}
                  >
                    <input
                      type="text"
                      className="select-boat-description-booking-card-dates-from-input"
                      value={this.state.fromDate.toLocaleDateString()}
                    />
                  </div>
                  <div
                    className={
                      this.state.clickFromDay
                        ? 'react-calender-booking-card toggle-off'
                        : 'react-calender-booking-card'
                    }
                  >
                    <Calendar
                      onChange={this.onChangeFrom}
                      value={this.state.fromDate}
                      onClickDay={() => this.setState({ clickFromDay: true })}
                    />
                  </div>
                </div>
                <div style={{ width: '40%' }}>
                  <label className="select-boat-description-booking-card-dates-label">
                    To
                  </label>
                  <div
                    style={{ position: 'relative' }}
                    className="select-boat-description-booking-card-dates-from"
                    onFocus={() => this.setState({ clickToDay: false })}
                  >
                    <input
                      type="text"
                      className="select-boat-description-booking-card-dates-from-input"
                      value={this.state.toDate.toLocaleDateString()}
                    />
                  </div>
                  <div
                    className={
                      this.state.clickToDay
                        ? 'react-calender-booking-card toggle-off'
                        : 'react-calender-booking-card'
                    }
                  >
                    <Calendar
                      onChange={this.onChangeTo}
                      value={this.state.toDate}
                      onClickDay={() => this.setState({ clickToDay: true })}
                    />
                  </div>
                </div>
              </div>
              <div className="select-boat-description-booking-card-days-container">
                <div style={{ width: '90px', height: '22px' }}>
                  <p className="select-boat-description-booking-card-days">
                    Days
                  </p>
                </div>
                <div style={{ width: '90px', height: '22px' }}>
                  <p className="select-boat-description-booking-card-days-number">
                    {this.state.toDate.getDate() -
                      this.state.fromDate.getDate() ===
                    0
                      ? 1
                      : Math.ceil(
                          (this.state.toDate.getTime() -
                            this.state.fromDate.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}
                  </p>
                </div>
              </div>
            </div>
            <div className="select-boat-description-booking-card-separator-line"></div>
            <div style={{ width: '85%', display: 'inline-block' }}>
              <div className="select-boat-description-booking-card-days-container">
                <div style={{ width: '90px', height: '22px' }}>
                  <p className="select-boat-description-booking-card-total-heading">
                    Total
                  </p>
                </div>
                <div style={{ width: '90px', height: '22px' }}>
                  <p className="select-boat-description-booking-card-total-price">
                    {`$${
                      this.state.toDate.getDate() -
                        this.state.fromDate.getDate() ===
                      0
                        ? 1 * dailyBookingPrice
                        : Math.ceil(
                            (this.state.toDate.getTime() -
                              this.state.fromDate.getTime()) /
                              (1000 * 60 * 60 * 24)
                          ) * dailyBookingPrice
                    }`}
                  </p>
                </div>
              </div>
              <button
                to="/selectboat/checkout"
                className="select-boat-description-booking-card-book-now-btn"
                onClick={() => history.push('/selectboat/checkout')}
              >
                Book Now
              </button>
              <button
                onClick={this.props.messageOpenModal}
                className="select-boat-description-booking-card-message-owner-btn"
              >
                Message Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { bookingCard })(BookingCard);
