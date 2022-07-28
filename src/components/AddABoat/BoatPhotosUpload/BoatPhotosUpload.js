import React from 'react';

import addIcon from './Images/addIcon.svg';
import deleteIcon from './Images/deleteIcon.png';

class BoatPhotosUpload extends React.Component {
  state = { images: [] };
  render() {
    console.log('imagesprop===>', this.props.images);
    console.log('imagesstate===>', this.state.images);

    return (
      <div className="addaboat-separator-line ">
        <div
          className="addaboat-separator-line-align "
          style={{ border: 'none' }}
        >
          <div className="addaboat-separator-line-align-boat-upload-container">
            <div className="addaboat-separator-line-align-boat-upload">
              <label>
                <img
                  className="addaboat-separator-line-align-boat-upload-icon"
                  src={addIcon}
                  alt="add icon"
                />
                <input
                  type="file"
                  className="addaboat-separator-line-align-boat-upload-button"
                  onChange={this.props.upload}
                  multiple
                />
              </label>
              <p style={{ marginTop: '13px', color: '#343434' }}>Add Image</p>
            </div>
          </div>
          <div className="addaboat-separator-line-align-boat-upload-preview">
            {this.props.images.length > 0
              ? this.props.images.map((dataUrl, index) => {
                  const blob = new Blob(dataUrl, { type: 'mime' });
                  const image = URL.createObjectURL(blob);
                  console.log('blobnew===>', blob);
                  return (
                    <div
                      key={index}
                      style={{
                        width: 'auto',
                        height: 'auto',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={image}
                        alt="boat image"
                        className="addaboat-separator-line-align-boat-upload-preview-image"
                        style={{
                          height: '220px',
                          width: '280px',
                          borderRadius: '5px',
                          marginRight: '13px',
                          marginTop: '13px',

                          justifyContent: 'center',
                        }}
                      />

                      <img
                        src={deleteIcon}
                        alt="delete icon"
                        style={{
                          height: '35px',
                          width: '35px',
                          position: 'absolute',
                          left: '230px',
                          top: '20px',
                          cursor: 'pointer',
                          filter: 'drop-shadow(4px 0px 1px black)',
                        }}
                        onClick={() => this.props.handleDeletePhoto(dataUrl)}
                      />
                    </div>
                  );
                })
              : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default BoatPhotosUpload;
