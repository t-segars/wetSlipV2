import React from 'react';
import addIcon from './Images/addIcon.svg';
import deleteIcon from './Images/deleteIcon.png';
import captainIcon from './Images/Vector1.svg';
import anchorIcon from './Images/Vector2.svg';
import { Checkbox } from 'semantic-ui-react';
import { auth, uploadBoatingQualification } from '../../../firebase/firebase';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { ToastContainer, toast } from 'react-toastify';

class BoatingQualification extends React.Component {
  state = {
    captain: false,
    notACaptain: false,
    boatingQualification: {
      captainLicense: '',
      sailingStatus: '',
      sailingResume: '',
      boatingExperience: '',
      JetSki: false,
      Catamaran: false,
      Yacht: false,
      Motorboat: false,
      Sailboat: false,
      RIB: false,
      Houseboat: false,
    },
    blobImage: '',
    boatImages: [],
    loaded: false,
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        const db = firebase.firestore();

        const docRef = await db
          .collection(`users`)
          .doc(`${!userAuth ? 'empty' : userAuth.uid}`);

        const data = await docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.setState({ boatingQualification: doc.data() });
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!');
            }
          })
          .catch(function (error) {
            console.log('Error getting document:', error);
          });

        console.log('docRef==>', docRef);
        console.log('data===>', data);
      });
    };
    fetchData();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  handleSubmit = async () => {
    const {
      sailingResume,
      sailingStatus,
      boatingExperience,
    } = this.state.boatingQualification;

    if ((sailingResume, sailingStatus, boatingExperience)) {
      await uploadBoatingQualification(
        this.props.currentUser,
        this.state.boatingQualification,
        this.state.boatImages
      );
      toast.success('Saved Successfully', {
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

  handleClick = (name, value) => {
    if (name == 'captain') {
      this.setState({ captain: value });
      this.setState({ notACaptain: false });
    }
    if (name == 'notACaptain') {
      this.setState({ captain: false });
      this.setState({ notACaptain: value });
    }
  };

  upload = async (event) => {
    let image = [event.target.files[0]];
    const blob = new Blob(image, { type: 'mime' });
    const imageUrl = URL.createObjectURL(blob);
    console.log('imageUrl==>', imageUrl);
    await this.setState({
      boatingQualification: {
        ...this.state.boatingQualification,
        captainLicense: imageUrl,
      },
    });
    this.setState({ blobImage: imageUrl });

    this.setState({
      boatImages: image,
    });
  };

  handleDeletePhoto = (image) => {
    console.log('blobUrl===>', this.state.blobImage);
    console.log('image===>', image);
    this.setState({
      blobImage: this.state.blobImage === image ? '' : this.state.blobImage,
    });
  };

  handleCheckBox = (name, value) => {
    console.log('name', this.state.boatingQualification[name]);
    return this.state.boatingQualification[name] ? (
      <Checkbox
        className="boat-experience-boat-driven-checkbox"
        label={name}
        onChange={() =>
          this.setState({
            boatingQualification: {
              ...this.state.boatingQualification,
              [name]: value,
            },
          })
        }
        defaultChecked
      />
    ) : (
      <Checkbox
        className="boat-experience-boat-driven-checkbox"
        label={name}
        onChange={() =>
          this.setState({
            boatingQualification: {
              ...this.state.boatingQualification,
              [name]: value,
            },
          })
        }
      />
    );
  };

  render() {
    const {
      sailingResume,
      sailingStatus,
      boatingExperience,
      boatDriven,
    } = this.state.boatingQualification;

    const boatingjshhhsd = {
      sailingResume,
      sailingStatus,
      boatingExperience,
      boatDriven,
    };
    console.log('boatingksjksdjk====>', boatingjshhhsd);

    const {
      JetSki,
      Catamaran,
      Motorboat,
      Houseboat,
      Yacht,
      Sailboat,
      RIB,
    } = this.state.boatingQualification;

    return (
      <>
        {this.props.handleGeneralClick ? (
          <div className="personal-profile-right">
            <div
              className="personal-profile-right-container"
              style={{ minHeight: '200px' }}
            >
              <div className="personal-information-header">
                <h1 className="personal-information-header-text">
                  Sailing Status
                </h1>
              </div>
              <div
                className="personal-information-body"
                style={{ textAlign: 'center' }}
              >
                <div className="boating-qualification-captain-license">
                  <p className="boating-qualification-captain-license-text">
                    Select a captain if you have a Valid License
                  </p>
                </div>
                <div className="boating-qualification-captain-flex">
                  <div
                    className={
                      // this.props.boatingQualification.sailingStatus
                      //   ? 'boating-qualification-captain-blue'
                      //   :
                      this.state.captain
                        ? 'boating-qualification-captain-blue'
                        : 'boating-qualification-captain'
                    }
                    onClick={() => {
                      this.handleClick('captain', !this.state.captain);
                      this.setState({
                        boatingQualification: {
                          ...this.state.boatingQualification,
                          sailingStatus: 'I am a captain',
                        },
                      });
                    }}
                  >
                    <img
                      src={captainIcon}
                      alt="icon"
                      className={
                        this.state.captain
                          ? 'boating-qualification-captain-image-blue'
                          : 'boating-qualification-captain-image'
                      }
                    />
                    <p
                      className={
                        this.state.captain
                          ? 'boating-qualification-captain-image-text-white'
                          : 'boating-qualification-captain-image-text'
                      }
                    >
                      I am a captain
                    </p>
                  </div>
                  <div
                    className={
                      this.state.notACaptain
                        ? 'boating-qualification-captain-blue'
                        : 'boating-qualification-captain'
                    }
                    onClick={() => {
                      this.handleClick('notACaptain', !this.state.notACaptain);
                      this.setState({
                        boatingQualification: {
                          ...this.state.boatingQualification,
                          sailingStatus: 'Not a captain',
                        },
                      });
                    }}
                  >
                    <img
                      src={anchorIcon}
                      alt="icon"
                      className={
                        this.state.notACaptain
                          ? 'boating-qualification-captain-image-blue'
                          : 'boating-qualification-captain-image'
                      }
                    />
                    <p
                      className={
                        this.state.notACaptain
                          ? 'boating-qualification-captain-image-text-white'
                          : 'boating-qualification-captain-image-text'
                      }
                    >
                      Not a captain
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="personal-profile-right-container"
              style={{ minHeight: '200px', marginTop: '28px' }}
            >
              <div className="personal-information-header">
                <h1 className="personal-information-header-text">
                  Sailing Resume
                </h1>
              </div>
              <div
                className="personal-information-body"
                style={{ textAlign: 'center' }}
              >
                <div
                  className="personal-information-firstname-container-text"
                  style={{
                    width: '20%',
                    textAlign: 'start',
                  }}
                >
                  <label className="personal-information-name-firstname-label">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    className="personal-information-name-firstname"
                    onChange={(event) =>
                      this.setState({
                        boatingQualification: {
                          ...this.state.boatingQualification,
                          boatingExperience: event.target.value,
                        },
                      })
                    }
                    defaultValue={
                      this.state.boatingQualification.boatingExperience
                        ? this.state.boatingQualification.boatingExperience
                        : ''
                    }
                  />
                </div>
                <div
                  className="personal-information-phone-number-container"
                  style={{
                    width: '100%',
                    textAlign: 'start',
                  }}
                >
                  <label className="personal-information-name-firstname-label">
                    Sailing resume
                  </label>
                  <textarea
                    type="text"
                    className="personal-information-name-firstname"
                    style={{ height: '166px' }}
                    onChange={(event) =>
                      this.setState({
                        boatingQualification: {
                          ...this.state.boatingQualification,
                          sailingResume: event.target.value,
                        },
                      })
                    }
                    defaultValue={
                      this.state.boatingQualification.sailingResume
                        ? this.state.boatingQualification.sailingResume
                        : ''
                    }
                  />
                </div>
              </div>
            </div>
            <div
              className="personal-profile-right-container"
              style={{ minHeight: '200px', marginTop: '28px' }}
            >
              <div className="personal-information-header">
                <h1 className="personal-information-header-text">
                  Boat Experience
                </h1>
              </div>
              <div
                className="personal-information-body"
                style={{ textAlign: 'start' }}
              >
                <p className="boat-experience-boat-driven-text">
                  Type of boat driven
                </p>
                <div
                  style={{
                    marginTop: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '55%',
                  }}
                >
                  <div style={{ width: '20%' }}>
                    {this.handleCheckBox('JetSki', !JetSki)}
                    {this.handleCheckBox('Yacht', !Yacht)}
                    {this.handleCheckBox('Catamaran', !Catamaran)}
                    {this.handleCheckBox('Motorboat', !Motorboat)}
                  </div>
                  <div style={{ width: '20%' }}>
                    {this.handleCheckBox('Sailboat', !Sailboat)}
                    {this.handleCheckBox('RIB', !RIB)}
                    {this.handleCheckBox('Houseboat', !Houseboat)}
                  </div>
                </div>
              </div>
            </div>
            {this.state.captain ? (
              <div
                className="personal-profile-right-container"
                style={{ minHeight: '200px', marginTop: '28px' }}
              >
                <div className="personal-information-header">
                  <h1 className="personal-information-header-text">
                    Captain License
                  </h1>
                </div>
                <div
                  className="personal-information-body"
                  style={{ textAlign: 'center' }}
                >
                  <div
                    className="boating-qualification-captain-license"
                    style={{ width: '70%' }}
                  >
                    <p className="boating-qualification-captain-license-text">
                      Upload a scanned visible image of your valid Captain’s
                      license to enable us verify you
                    </p>
                  </div>
                  <div
                    className="personal-information-body-pic"
                    style={{ marginTop: '14px' }}
                  >
                    <label
                      style={{
                        display: 'table-cell',
                        verticalAlign: 'middle',
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                      }}
                    >
                      {!this.state.blobImage ? (
                        <img
                          className="addaboat-separator-line-align-boat-upload-icon-resize"
                          style={{ margin: '0' }}
                          src={this.props.userProfile.captainLicense}
                          alt="add icon"
                        />
                      ) : (
                        <img
                          className={
                            this.state.blobImage
                              ? 'addaboat-separator-line-align-boat-upload-icon-resize'
                              : 'addaboat-separator-line-align-boat-upload-icon'
                          }
                          style={{ margin: '0' }}
                          src={
                            this.state.blobImage
                              ? this.state.blobImage
                              : addIcon
                          }
                          alt="add icon"
                        />
                      )}

                      <input
                        type="file"
                        className="addaboat-separator-line-align-boat-upload-button"
                        onChange={this.upload}
                        multiple
                      />

                      {this.state.blobImage ? (
                        ''
                      ) : (
                        <div
                          style={{
                            height: this.state.blobImage ? '' : '30px',
                          }}
                        >
                          <p
                            style={{
                              marginTop: this.state.blobImage ? '13px' : '7px',
                              color: '#343434',
                              cursor: 'pointer',
                            }}
                          >
                            {this.state.boatingQualification.captainLicense
                              ? 'Change Profile Picture'
                              : 'Add Image'}
                          </p>
                        </div>
                      )}
                    </label>
                    <img
                      src={deleteIcon}
                      alt="delete icon"
                      style={{
                        display: this.state.blobImage ? '' : 'none',
                        height: '35px',
                        width: '35px',
                        position: 'absolute',
                        left: '85%',
                        top: '2%',
                        cursor: 'pointer',
                        filter: 'drop-shadow(4px 0px 1px black)',
                      }}
                      onClick={() =>
                        this.handleDeletePhoto(this.state.blobImage)
                      }
                    />
                  </div>
                  <div
                    className="personal-information-phone-number-container"
                    style={{
                      width: '100%',
                      textAlign: 'start',
                    }}
                  >
                    <label className="personal-information-name-firstname-label">
                      Sailing License
                    </label>
                    <input
                      type="text"
                      className="personal-information-name-firstname"
                      onChange={(event) =>
                        this.setState({
                          boatingQualification: {
                            ...this.state.boatingQualification,
                            sailingLicense: event.target.value,
                          },
                        })
                      }
                      defaultValue={
                        this.state.boatingQualification.sailingLicense
                          ? this.state.boatingQualification.sailingLicense
                          : ''
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            <button
              className="personal-information-button"
              style={{ float: 'left' }}
              onClick={this.handleSubmit}
            >
              Save
            </button>
            <ToastContainer />
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { userProfile: state.userProfile, currentUser: state.currentUser };
};

export default connect(mapStateToProps)(BoatingQualification);
