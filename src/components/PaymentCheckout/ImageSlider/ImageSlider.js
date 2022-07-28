import React from 'react';
import { Slide } from 'react-slideshow-image';

class ImageSlider extends React.Component {
  render() {
    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: false,
      arrows: false,
      pauseOnHover: true,
    };
    return (
      <Slide {...properties} className="active">
        {this.props.selectBoat
          ? this.props.selectBoat.images.map((photo, index) => {
              return (
                <div
                  style={{
                    width: '100%',
                    height: '257px',
                    backgroundSize: 'cover',
                    textAlign: 'center',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    display: 'inline-block',

                    overflow: 'none',
                  }}
                  className="active"
                  key={index}
                >
                  <div
                    style={{
                      backgroundImage: `linear-gradient(180deg, #FFFFFF 79.37%, #000000 107.14%), url(${photo})`,
                      width: '100%',
                      height: '257px',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center center',
                      backgroundRepeat: 'no-repeat',
                      display: 'inline-block',

                      backgroundBlendMode: 'multiply, normal',
                    }}
                    className="active"
                  ></div>
                </div>
              );
            })
          : 'loading'}
      </Slide>
    );
  }
}

export default ImageSlider;
