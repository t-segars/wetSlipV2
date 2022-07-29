import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMapLocation extends Component {
  static defaultProps = {
    center: {
      lat: 30.31192,
      lng: -87.43949,
    },
    zoom: 13,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '257px', width: '100%', marginTop: '12px ' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDcwjypheCfJQvuGlvU77vyYZ5GUVCQ1zs' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={30.31192} lng={-87.43949} text="wetSlip HQ" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMapLocation;
