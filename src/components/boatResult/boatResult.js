import React from 'react';
import { Range, getTrackBackground } from 'react-range';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { listBoats } from '../../actions/';
import { similarBoats } from '../../actions';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BoatCard from './boatCard';
import FilterComponents from './Filter';
import Pagination from './Pagination';
import Footer from '../Footer/Footer';

import LengthSlider from './lengthSlider';
import CapacitySliders from './capacitySlider';
import CabinSlider from './cabinSlider';
import Loading from '../Loading/Loading';

import './boatResult.css';
import pinIcon from './images/pinIcon.svg';

const STEPS = 0.1;
const MINS = 0;
const MAXS = 1000;

class boatResult extends React.Component {
  state = {
    listOfBoats: [],
    mobileFilter: false,
    values: [0, 1000],
    filteredSearch: [],
    currentPage: 1,
    boatsPerPage: 9,
    location: '',
    boatType: '',
    price: [],
    length: [],
    capacity: [],
    cabin: [],
    manufacturer: '',
    fromDate: new Date(),
    toDate: new Date(),
    clickToDay: true,
    clickFromDay: true,
    loading: true,
  };

  componentDidUpdate() {
    this.props.similarBoats(this.state.filteredSearch);
    this.props.listBoats(this.state.listOfBoats);
  }

  handleMobileFilterClick = () => {
    this.setState((prevState) => ({ mobileFilter: !prevState.mobileFilter }));
  };

  handleFilter = (name, value) => {
    const boatsCopy = [...this.props.boats];
    const searchResult =
      this.state.filteredSearch.length > 0
        ? this.state.filteredSearch.filter((aBoat) => {
            switch (name) {
              case 'city':
                return aBoat.city
                  ? aBoat.city.toLowerCase().includes(value.toLowerCase())
                  : null;
              case 'boatType':
                return aBoat.boatType
                  ? aBoat.boatType.toLowerCase().includes(value.toLowerCase())
                  : null;
              case 'price':
                if (this.state.values[1] === 1000) {
                  return aBoat.dailyBookingPrice >= this.state.values[0] &&
                    aBoat.dailyBookingPrice >= this.state.values[1]
                    ? aBoat.dailyBookingPrice
                    : null;
                } else {
                  return aBoat.dailyBookingPrice >= this.state.values[0] &&
                    aBoat.dailyBookingPrice <= this.state.values[1]
                    ? aBoat.dailyBookingPrice
                    : null;
                }
              case 'length':
                return aBoat.lengthOfBoats >= value[0] &&
                  aBoat.lengthOfBoats <= value[1]
                  ? aBoat.lengthOfBoats
                  : null;

              case 'capacity':
                return aBoat.boatCapacity >= value[0] &&
                  aBoat.boatCapacity <= value[1]
                  ? aBoat.boatCapacity
                  : null;
              case 'cabin':
                return aBoat.numberOfCabins >= value[0] &&
                  aBoat.numberOfCabins <= value[1]
                  ? aBoat.numberOfCabins
                  : null;
              case 'boatManufacturer':
                return aBoat.boatManufacturer
                  ? aBoat.boatManufacturer
                      .toLowerCase()
                      .includes(value.toLowerCase())
                  : null;

              default:
            }
          })
        : boatsCopy.filter((aBoat) => {
            switch (name) {
              case 'city':
                return aBoat.city
                  ? aBoat.city.toLowerCase().includes(value.toLowerCase())
                  : null;
              case 'boatType':
                return aBoat.boatType
                  ? aBoat.boatType.toLowerCase().includes(value.toLowerCase())
                  : null;
              case 'price':
                if (this.state.values[1] === 1000) {
                  return aBoat.dailyBookingPrice >= this.state.values[0] &&
                    aBoat.dailyBookingPrice >= this.state.values[1]
                    ? aBoat.dailyBookingPrice
                    : null;
                } else {
                  return aBoat.dailyBookingPrice >= this.state.values[0] &&
                    aBoat.dailyBookingPrice <= this.state.values[1]
                    ? aBoat.dailyBookingPrice
                    : null;
                }
              case 'length':
                if (value[1] === 1000) {
                  return aBoat.lengthOfBoats >= value[0] &&
                    aBoat.lengthOfBoats >= value[1]
                    ? aBoat.lengthOfBoats
                    : null;
                } else {
                  return aBoat.lengthOfBoats >= value[0] &&
                    aBoat.lengthOfBoats <= value[1]
                    ? aBoat.lengthOfBoats
                    : null;
                }
              case 'capacity':
                return aBoat.boatCapacity >= value[0] &&
                  aBoat.boatCapacity <= value[1]
                  ? aBoat.boatCapacity
                  : null;
              case 'cabin':
                return aBoat.numberOfCabins >= value[0] &&
                  aBoat.numberOfCabins <= value[1]
                  ? aBoat.numberOfCabins
                  : null;
              case 'boatManufacturer':
                return aBoat.boatManufacturer
                  ? aBoat.boatManufacturer
                      .toLowerCase()
                      .includes(value.toLowerCase())
                  : null;
              default:
            }
          });

    this.setState({
      filteredSearch: searchResult,
    });
  };

  async componentDidMount() {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      let db = firebase.firestore();
      let boatsRef = await db.collectionGroup('userBoats').get();

      let boats = [];

      boatsRef.docs.map((doc) => boats.push(doc.data()));

      this.setState({
        listOfBoats: boats,
      });

      return boats;
    };
    await fetchData();

    this.handleFilter('city', this.props.location);
    this.setState({ loading: false });
  }

  paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

  handlePrevButton = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  handleNextButton = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  onChangeTo = (date) => this.setState({ toDate: date });
  onChangeFrom = (date) => this.setState({ fromDate: date });

  handleSelectedDate = () => {};

  render() {
    console.log('listOfBoats===>', this.state.listOfBoats);
    const indexOfLastBoat = this.state.currentPage * this.state.boatsPerPage;
    const indexOfFirstBoat = indexOfLastBoat - this.state.boatsPerPage;
    const currentBoats = this.state.filteredSearch.slice(
      indexOfFirstBoat,
      indexOfLastBoat
    );

    return (
      <div className="boat-result-container">
        <div className="boat-result-align">
          <div className="boat-result-input-search-container">
            <div className="boat-result-input-search-top-filter">
              <div className="boat-result-input-search-city">
                <label className="boat-result-input-search-city-label">
                  Location
                </label>
                <input
                  type="text"
                  className="boat-result-input-search-city-input"
                  onChange={(event) => {
                    this.handleFilter(
                      'city',
                      `${event.target.value || this.props.location}`
                    );
                  }}
                />
                <img
                  src={pinIcon}
                  alt="pin icon"
                  className="boat-result-input-search-city-pin"
                />
              </div>
              <div
                className="boat-result-input-search-from"
                style={{ position: 'relative' }}
                onFocus={() => this.setState({ clickFromDay: false })}
              >
                <label className="boat-result-input-search-from-label">
                  From
                </label>
                <input
                  type="text"
                  className="boat-result-input-search-from-input"
                  value={this.state.fromDate.toLocaleDateString()}
                />
                <div
                  className={
                    this.state.clickFromDay
                      ? 'react-calender toggle-off'
                      : 'react-calender'
                  }
                >
                  <Calendar
                    onChange={this.onChangeFrom}
                    value={this.state.fromDate}
                    onClickDay={() => this.setState({ clickFromDay: true })}
                  />
                </div>
              </div>

              <div
                className="boat-result-input-search-to"
                onFocus={() => this.setState({ clickToDay: false })}
              >
                <label className="boat-result-input-search-to-label">To</label>
                <input
                  type="text"
                  className="boat-result-input-search-to-input"
                  value={this.state.toDate.toLocaleDateString()}
                />
                <div
                  className={
                    this.state.clickToDay
                      ? 'react-calender toggle-off'
                      : 'react-calender'
                  }
                >
                  <Calendar
                    onChange={this.onChangeTo}
                    value={this.state.toDate}
                    onClickDay={() => this.setState({ clickToDay: true })}
                  />
                </div>
              </div>
              <div className="boat-result-input-search-boat-type">
                <label className="boat-result-input-search-boat-type-label">
                  Boat Type
                </label>
                <select
                  type="text"
                  className="boat-result-input-search-boat-type-input"
                  onChange={(event) => {
                    this.setState({ boatType: event.target.value });
                    this.handleFilter('boatType', event.target.value);
                  }}
                >
                  <option value={'YACHT'}>Yacht</option>
                  <option value={'CATAMARAN'}>Catamaran</option>
                  <option value={'HOUSE BOAT'}>House Boat</option>
                  <option value={'JET SKI'}>Jet Ski</option>
                  <option value={'MOTOR BOAT'}>Motor Boat</option>
                  <option value={'RIB'}>RIB</option>
                  <option value={'SAIL BOAT'}>Sail Boat</option>
                </select>
              </div>
            </div>
            <div className="boat-result-input-filter-toggle">
              <button
                className="boat-result-input-filter-toggle-button"
                onClick={this.handleMobileFilterClick}
              >
                Filters
              </button>
            </div>
            {this.state.mobileFilter ? (
              <FilterComponents
                values={this.state.values}
                MAXS={MAXS}
                MINS={MINS}
                STEPS={STEPS}
                handleFilter={this.handleFilter}
              />
            ) : null}

            <div className="boat-result-input-search-boat-type-background">
              <div className="boat-result-input-search-boat-type-background-text">
                {this.state.boatType}
              </div>
            </div>
            <div className="boat-result-search-result">
              <div className="boat-result-search-result-filter">
                <div className="boat-result-search-result-filter-align">
                  <div className="boat-result-search-result-filter-label">
                    <label className="boat-result-search-result-filter-label-price">
                      Price
                    </label>
                    <output
                      style={{
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '18px',
                        lineHeight: '27px',
                        display: 'flex',
                        alignItems: 'center',
                        letterSpacing: ' 0.05em',

                        color: '#787878',
                      }}
                    >
                      {this.state.values[0]} -{' '}
                      {MAXS === this.state.values[1]
                        ? '$' + this.state.values[1] + '+'
                        : '$' + this.state.values[1]}
                    </output>
                  </div>
                  <div
                    style={{
                      marginRight: '3.0%',
                      marginLeft: '3.0%',
                    }}
                  >
                    <Range
                      values={this.state.values}
                      step={STEPS}
                      min={MINS}
                      max={MAXS}
                      onChange={(values) => {
                        this.setState({ values });
                        this.handleFilter('price');
                      }}
                      renderTrack={({ props, children }) => (
                        <div
                          onMouseDown={props.onMouseDown}
                          onTouchStart={props.onTouchStart}
                          style={{
                            ...props.style,
                            height: '36px',
                            display: 'flex',
                            width: '100%',
                          }}
                        >
                          <div
                            ref={props.ref}
                            style={{
                              height: '5px',
                              width: '100%',
                              borderRadius: '4px',
                              background: getTrackBackground({
                                values: this.state.values,
                                colors: ['#ccc', '#39a0ed', '#ccc'],
                                min: MINS,
                                max: MAXS,
                              }),
                              alignSelf: 'center',
                            }}
                          >
                            {children}
                          </div>
                        </div>
                      )}
                      renderThumb={({ props, isDragged }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: '20px',
                            width: '20px',
                            borderRadius: '10px',
                            backgroundColor: '#FFF',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 6px #AAA',
                            outline: 'none',
                          }}
                        >
                          <div
                            style={{
                              height: '10px',
                              width: '5px',
                              backgroundColor: isDragged ? '#548BF4' : '#CCC',
                            }}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <LengthSlider handleFilter={this.handleFilter} />
                <CapacitySliders handleFilter={this.handleFilter} />
                <CabinSlider handleFilter={this.handleFilter} />
                <div className="boat-result-search-result-filter-align">
                  <div className="boat-result-search-result-filter-label">
                    <label className="boat-result-search-result-filter-label-price">
                      Manufacturer
                    </label>
                  </div>
                  <input
                    className="boat-result-search-result-filter-label-price-input"
                    onChange={(event) => {
                      this.handleFilter('boatManufacturer', event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="boat-result-search-result-boat-list">
                {!this.state.loading ? (
                  <>
                    {currentBoats.map((data, index) => (
                      <BoatCard data={data} key={index} />
                    ))}
                  </>
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
          <div className="boat-result-search-live-chat">
            <div
              className="boat-result-search-live-chat-align"
              style={{ cursor: 'pointer' }}
            >
              <p
                style={{
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '15px',
                  lineHeight: '22px',
                  display: 'block',
                  marginTop: '11px',
                  marginBottom: '0px',
                  color: '#000000',
                }}
              >
                Need help?
              </p>
              <span
                style={{
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '18px',
                  lineHeight: '27px',
                  display: 'block',
                  marginTop: '11px',
                  color: '#39A0ED',
                }}
              >
                Chat with us
              </span>
            </div>
          </div>
          <Pagination
            boatsPerPage={this.state.boatsPerPage}
            totalBoats={this.state.filteredSearch.length}
            paginate={this.paginate}
            currentPage={this.state.currentPage}
            handleNextButton={this.handleNextButton}
            handlePrevButton={this.handlePrevButton}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('location', state.location);
  return { boats: state.boatList, location: state.location };
};

export default connect(mapStateToProps, { listBoats, similarBoats })(
  boatResult
);
