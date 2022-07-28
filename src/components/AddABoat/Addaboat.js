import React from 'react';
import { addBoat, currentUser } from '../../actions';
import { connect } from 'react-redux';
import { addCollectionAndDocument, auth } from '../../firebase/firebase';

import BoatPhotosUpload from './BoatPhotosUpload/BoatPhotosUpload';
import Footer from '../Footer/Footer';

import './addaboat.css';
import boat from './images/boat.svg';
import yatch from './images/yatch.svg';
import catamaran from './images/catamaran.svg';
import houseboat from './images/houseboat.svg';
import jetski from './images/jetski.svg';
import motorboat from './images/motorboat.svg';
import rib from './images/rib.svg';
import sailboat from './images/sailboat.svg';

class AddABoat extends React.Component {
  state = {
    yachts: false,
    catamarans: false,
    houseboats: false,
    jetskis: false,
    motorboats: false,
    ribs: false,
    sailboats: false,
    boatData: {
      boatType: '',
      boatManufacturer: '',
      boatModel: '',
      city: '',
      boatHabour: '',
      captain: '',
      currency: '',
      dailyBookingPrice: '',
      numberOfCabins: '',
      numberOfBathrooms: '',
      lengthOfBoats: '',
      boatCapacity: '',
      boatDescription: '',
      createdAt: new Date(),
      uid: '',
    },
    boatImages: [],

    previewImages: [],

    error: '',
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    window.scrollTo(0, 0);

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        this.setState({
          boatData: { ...this.state.boatData, uid: userAuth.uid },
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  handleClick = (name, click) => {
    if (name === 'yachts') {
      this.setState({ yachts: true });
      this.setState({ catamarans: false });
      this.setState({ houseboats: false });
      this.setState({ jetskis: false });
      this.setState({ motorboats: false });
      this.setState({ ribs: false });
      this.setState({ sailboats: false });
    }
    if (name === 'catamarans') {
      this.setState({ catamarans: true });
      this.setState({ yachts: false });
      this.setState({ houseboats: false });
      this.setState({ jetskis: false });
      this.setState({ motorboats: false });
      this.setState({ ribs: false });
      this.setState({ sailboats: false });
    }
    if (name === 'houseboats') {
      this.setState({ catamarans: false });
      this.setState({ yachts: false });
      this.setState({ houseboats: true });
      this.setState({ jetskis: false });
      this.setState({ motorboats: false });
      this.setState({ ribs: false });
      this.setState({ sailboats: false });
    }
    if (name === 'jetskis') {
      this.setState({ catamarans: false });
      this.setState({ yachts: false });
      this.setState({ houseboats: false });
      this.setState({ jetskis: true });
      this.setState({ motorboats: false });
      this.setState({ ribs: false });
      this.setState({ sailboats: false });
    }
    if (name === 'motorboats') {
      this.setState({ catamarans: false });
      this.setState({ yachts: false });
      this.setState({ houseboats: false });
      this.setState({ jetskis: false });
      this.setState({ motorboats: true });
      this.setState({ ribs: false });
      this.setState({ sailboats: false });
    }
    if (name === 'ribs') {
      this.setState({ catamarans: false });
      this.setState({ yachts: false });
      this.setState({ houseboats: false });
      this.setState({ jetskis: false });
      this.setState({ motorboats: false });
      this.setState({ ribs: true });
      this.setState({ sailboats: false });
    }
    if (name === 'sailboats') {
      this.setState({ catamarans: false });
      this.setState({ yachts: false });
      this.setState({ houseboats: false });
      this.setState({ jetskis: false });
      this.setState({ motorboats: false });
      this.setState({ ribs: false });
      this.setState({ sailboats: true });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  upload = (event) => {
    let image = [event.target.files[0]];
    console.log('===>uipload', image);

    this.setState({
      boatImages: [...this.state.boatImages, image],
    });
  };

  handleDeletePhoto = (image) => {
    this.setState({
      boatImages: this.state.boatImages.filter((url) => {
        return url !== image;
      }),
    });
  };

  handleAddABoatSubmit = () => {
    const { addBoat } = this.props;
    const {
      boatType,
      boatManufacturer,
      boatModel,
      city,
      boatHabour,
      captain,
      currency,
      dailyBookingPrice,
      numberOfCabins,
      numberOfBathrooms,
      lengthOfBoats,
      boatCapacity,
      boatDescription,
      createdAt,
    } = this.state.boatData;

    const boatImages = this.state;
    if (
      boatType &&
      boatManufacturer &&
      boatModel &&
      city &&
      boatHabour &&
      captain &&
      currency &&
      dailyBookingPrice &&
      numberOfCabins &&
      numberOfBathrooms &&
      lengthOfBoats &&
      boatCapacity &&
      boatDescription &&
      createdAt &&
      boatImages
    ) {
      addBoat(this.state.boatData);
      addCollectionAndDocument(
        'boats',
        this.state.boatData,
        this.state.boatImages,
        this.props.currentUser
      );
    } else {
      this.setState({ error: 'Kindly complete the form' });
    }
  };

  render() {
    console.log('boatdata===>', this.state.boatData);
    let yachts = this.state.yachts ? 'blue-background' : '';
    let catamarans = this.state.catamarans ? 'blue-background' : '';
    let houseboats = this.state.houseboats ? 'blue-background' : '';
    let jetskis = this.state.jetskis ? 'blue-background' : '';
    let motorboats = this.state.motorboats ? 'blue-background' : '';
    let ribs = this.state.ribs ? 'blue-background' : '';
    let sailboats = this.state.sailboats ? 'blue-background' : '';

    return (
      <div onSubmit={this.handleSubmit} className="addaboat-container">
        <div className="addaboat-align">
          <div className="addaboat-sailor">
            <div className="addaboat-sailor-align">
              <div className="addaboat-sailor-design"></div>

              <h1>Sailor! Let's get your boat listed</h1>
              <p>
                Your boat will be visible to our team of sailors interested in
                charter service
              </p>
              <div className="addaboat-sailor-boat-image">
                <img src={boat} alt="design" />
              </div>
            </div>
            <h1 className="addaboat-yourboat">
              Your boat <br />
              <span className="addaboat-boattype">Boat Type</span>
            </h1>
          </div>
        </div>
        <div className="addaboat-select-boattype-container">
          <div className="addaboat-select-boattype-container-align">
            <div
              className={`addaboat-select-boattype-box ${yachts}`}
              onClick={() => {
                this.handleClick('yachts', !this.state.yachts);
                this.setState({
                  boatData: { ...this.state.boatData, boatType: 'Yacht' },
                });
              }}
            >
              <img
                src={yatch}
                alt="yacht"
                className={this.state.yachts ? 'white-icon' : 'dark-icon'}
              />
              <p className={this.state.yachts ? 'white-text' : 'dark-text'}>
                Yacht
              </p>
            </div>
            <div
              className={`addaboat-select-boattype-box ${catamarans}`}
              onClick={() => {
                this.handleClick('catamarans', !this.state.catamarans);

                this.setState({
                  boatData: { ...this.state.boatData, boatType: 'Catamarans' },
                });
              }}
            >
              <img
                src={catamaran}
                alt="yacht"
                className={this.state.catamarans ? 'white-icon' : 'dark-icon'}
              />
              <p className={this.state.catamarans ? 'white-text' : 'dark-text'}>
                Catamaran
              </p>
            </div>
            <div
              className={`addaboat-select-boattype-box ${houseboats}`}
              onClick={() => {
                this.handleClick('houseboats', !this.state.houseboats);
                this.setState({
                  boatData: { ...this.state.boatData, boatType: 'Houseboat' },
                });
              }}
            >
              <img
                src={houseboat}
                alt="yacht"
                className={this.state.houseboats ? 'white-icon' : 'dark-icon'}
              />
              <p className={this.state.houseboats ? 'white-text' : 'dark-text'}>
                House Boat
              </p>
            </div>
            <div
              className={`addaboat-select-boattype-box ${jetskis}`}
              onClick={() => {
                this.handleClick('jetskis', !this.state.jetskis);
                this.setState({
                  boatData: { ...this.state.boatData, boatType: 'Jet ski' },
                });
              }}
            >
              <img
                src={jetski}
                alt="yacht"
                className={this.state.jetskis ? 'white-icon' : 'dark-icon'}
              />
              <p className={this.state.jetskis ? 'white-text' : 'dark-text'}>
                Jet Ski
              </p>
            </div>
            <div
              className={`addaboat-select-boattype-box ${motorboats}`}
              onClick={() => {
                this.handleClick('motorboats', !this.state.motorboats);
                this.setState({
                  boatData: { ...this.state.boatData, boatType: 'Motorboat' },
                });
              }}
            >
              <img
                src={motorboat}
                alt="yacht"
                className={this.state.motorboats ? 'white-icon' : 'dark-icon'}
              />
              <p className={this.state.motorboats ? 'white-text' : 'dark-text'}>
                Motor Boat
              </p>
            </div>
            <div
              className={`addaboat-select-boattype-box ${ribs}`}
              onClick={() => {
                this.handleClick('ribs', !this.state.ribs);
                this.setState({
                  boatData: { ...this.state.boatData, boatType: 'RIB' },
                });
              }}
            >
              <img
                src={rib}
                alt="yacht"
                className={this.state.ribs ? 'white-icon' : 'dark-icon'}
              />
              <p className={this.state.ribs ? 'white-text' : 'dark-text'}>
                RIB
              </p>
            </div>
            <div
              className={`addaboat-select-boattype-box ${sailboats}`}
              onClick={() => {
                this.handleClick('sailboats', !this.state.sailboats);
                this.setState({
                  boatData: { ...this.state.boatData, boatType: 'Sailboat' },
                });
              }}
            >
              <img
                src={sailboat}
                alt="yacht"
                className={this.state.sailboats ? 'white-icon' : 'dark-icon'}
              />
              <p className={this.state.sailboats ? 'white-text' : 'dark-text'}>
                Sail Boat
              </p>
            </div>
          </div>
        </div>
        <div className="addaboat-boat-manufacturer-container-align">
          <div className="addaboat-boat-manufacturer-container">
            <div className="addaboat-boat-manufacturer-align">
              <label
                className="add-boat-manufacturer"
                style={{ width: '355px' }}
              >
                Boat Manufacturer
              </label>
              <div className="addaboat-input-align">
                <input
                  placeholder="Select Manufacturer"
                  className="input-manufacturer"
                  type="text"
                  onChange={(event) => {
                    event.preventDefault();
                    this.setState({
                      boatData: {
                        ...this.state.boatData,
                        boatManufacturer: event.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="addaboat-boat-manufacturer-align">
              <label className="add-boat-manufacturer">Boat Model</label>
              <div className="addaboat-input-align">
                <input
                  placeholder="Select Model"
                  className="input-manufacturer"
                  type="text"
                  onChange={(event) => {
                    event.preventDefault();
                    this.setState({
                      boatData: {
                        ...this.state.boatData,
                        boatModel: event.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="addaboat-boat-manufacturer-container-align">
          <div className="addaboat-boat-manufacturer-container">
            <div className="addaboat-boat-manufacturer-align">
              <label
                className="add-boat-manufacturer"
                style={{ width: '355px' }}
              >
                City
              </label>
              <div className="addaboat-input-align">
                <input
                  placeholder="Which city are you located?"
                  className="input-manufacturer"
                  type="text"
                  onChange={(event) => {
                    event.preventDefault();
                    this.setState({
                      boatData: {
                        ...this.state.boatData,
                        city: event.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="addaboat-boat-manufacturer-align">
              <label className="add-boat-manufacturer">Boat Habour</label>
              <div className="addaboat-input-align">
                <input
                  name="firstname"
                  className="input-manufacturer"
                  type="text"
                  onChange={(event) => {
                    event.preventDefault();
                    this.setState({
                      boatData: {
                        ...this.state.boatData,
                        boatHabour: event.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="addaboat-boat-manufacturer-container-align">
          <div className="addaboat-boat-manufacturer-container">
            <div className="addaboat-boat-manufacturer-align">
              <label className="add-boat-manufacturer">
                Is your boat with a Captain ?
              </label>
              <div className="addaboat-input-align">
                <select
                  onChange={(event) =>
                    this.setState({
                      boatData: {
                        ...this.state.boatData,
                        captain: event.target.value,
                      },
                    })
                  }
                  className="input-manufacturer"
                  placeholder="Choose"
                >
                  <option>Select</option>
                  <option value={'Without Captain'}>Without Captain</option>
                  <option value={'With Captain'}>With Captain</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="addaboat-boat-manufacturer-container-align">
          <div
            className="addaboat-boat-manufacturer-container price"
            style={{ justifyContent: 'flex-start' }}
          >
            <div
              className="add-boat-manufacturer-price"
              style={{ width: '225px' }}
            >
              <label className="add-boat-manufacturer">Currency</label>
              <div className="addaboat-input-align currency">
                <select
                  className="currency-input"
                  onChange={(event) =>
                    this.setState({
                      boatData: {
                        ...this.state.boatData,
                        currency: event.target.value,
                      },
                    })
                  }
                >
                  <option selected>Select Currency</option>
                  <option value={'Euro'}>Euro (EUR)</option>
                  <option value={'GBP'}>Sterling (GBP)</option>
                  <option value={'USD'}>US Dollar (USD)</option>
                  <option value={'NGN'}>Naira (NGN)</option>
                </select>
              </div>
            </div>
            <div className="add-boat-manufacturer-price">
              <label className="add-boat-manufacturer">
                Daily booking price
              </label>
              <div className="addaboat-input-align currency">
                <input
                  className="currency-input"
                  placeholder="00.00"
                  type="number"
                  onChange={(event) => {
                    event.preventDefault();
                    this.setState({
                      boatData: {
                        ...this.state.boatData,
                        dailyBookingPrice: event.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="addaboat-separator-line">
          <div className="addaboat-separator-line-align"></div>
        </div>
        <div className="addaboat-separator-line">
          <div
            className="addaboat-separator-line-align"
            style={{ border: 'none' }}
          >
            <div className="addaboat-boat-size">
              <h1>Boat Size</h1>
            </div>
          </div>
        </div>
        <div
          className="addaboat-separator-line boat-size"
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            className="addaboat-separator-line-align boat-size"
            style={{
              border: 'none',
              display: 'flex',

              justifyContent: 'space-between',
            }}
          >
            <div className="add-boat-cabins-container">
              <label className="add-boat-manufacturer">Number of cabins</label>
              <div className="addaboat-input-align" style={{ width: '200px' }}>
                <input
                  className="input-manufacturer"
                  type="number"
                  onChange={(event) => {
                    event.preventDefault();
                    this.setState({
                      boatData: {
                        ...this.state.boatData,
                        numberOfCabins: event.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="add-boat-cabins-container">
              <label className="add-boat-manufacturer">
                Number of bathrooms
              </label>
              <div className="addaboat-input-align" style={{ width: '200px' }}>
                <input
                  className="input-manufacturer"
                  type="number"
                  onChange={(event) => {
                    event.preventDefault();
                    this.setState({
                      boatData: {
                        ...this.state.boatData,
                        numberOfBathrooms: event.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="add-boat-cabins-container">
              <label className="add-boat-manufacturer">
                Length of boat (ft)
              </label>
              <div className="addaboat-input-align" style={{ width: '200px' }}>
                <input
                  className="input-manufacturer"
                  type="number"
                  onChange={(event) => {
                    event.preventDefault();
                    this.setState({
                      boatData: {
                        ...this.state.boatData,
                        lengthOfBoats: event.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="add-boat-cabins-container">
              <label className="add-boat-manufacturer">Boat capacity</label>
              <div className="addaboat-input-align" style={{ width: '200px' }}>
                <input
                  className="input-manufacturer"
                  type="number"
                  onChange={(event) => {
                    event.preventDefault();
                    this.setState({
                      boatData: {
                        ...this.state.boatData,
                        boatCapacity: event.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="addaboat-separator-line">
          <div className="addaboat-separator-line-align"></div>
        </div>
        <div className="addaboat-separator-line">
          <div
            className="addaboat-separator-line-align"
            style={{ border: 'none' }}
          >
            <div className="addaboat-boat-size">
              <h1>Boat Description</h1>
            </div>
          </div>
        </div>
        <div className="addaboat-separator-line">
          <div
            className="addaboat-separator-line-align"
            style={{ border: 'none' }}
          >
            <label className="add-boat-manufacturer boat-description">
              Full description about your boat
            </label>
            <div
              className="addaboat-input-align"
              style={{ width: '100%', height: '130px' }}
            >
              <textarea
                style={{ height: '120px', width: '95%' }}
                name="firstname"
                className="input-manufacturer boat-description"
                type="text"
                onChange={(event) => {
                  event.preventDefault();
                  this.setState({
                    boatData: {
                      ...this.state.boatData,
                      boatDescription: event.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="addaboat-separator-line">
          <div className="addaboat-separator-line-align"></div>
        </div>
        <div className="addaboat-separator-line">
          <div
            className="addaboat-separator-line-align"
            style={{ border: 'none' }}
          >
            <div className="addaboat-boat-size">
              <h1>Add Photos</h1>
            </div>
          </div>
        </div>
        <BoatPhotosUpload
          upload={this.upload}
          handleDeletePhoto={this.handleDeletePhoto}
          images={this.state.boatImages}
        />
        {this.state.error.length > 0 && (
          <span className="form-error">{this.state.error}</span>
        )}
        <div className="addaboat-separator-line">
          <div
            className="addaboat-separator-line-align"
            style={{ border: 'none' }}
          >
            {' '}
            <div
              style={{ textAlign: 'start' }}
              className="addaboat-save-button-container"
            >
              <button
                onClick={this.handleAddABoatSubmit}
                className="addaboat-save-button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { addBoatState: state.hireaboat, currentUser: state.currentUser };
};

export default connect(mapStateToProps, { addBoat })(AddABoat);
