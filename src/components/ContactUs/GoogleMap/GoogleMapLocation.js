import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMapLocation extends Component {
  static defaultProps = {
    center: {
      lat: 6.524329,
      lng: 3.3759937,
    },
    zoom: 11,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '257px', width: '100%', marginTop: '12px ' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDXa4FE1HDIgPSWD5DGcBW9kbuQtzih2_M' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={6.524329} lng={3.3759937} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMapLocation;
