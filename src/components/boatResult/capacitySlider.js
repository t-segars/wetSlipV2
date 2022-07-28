import React from 'react';
import { Range, getTrackBackground } from 'react-range';

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

class CapacitySliders extends React.Component {
  state = { values: [0, 100] };

  render() {
    return (
      <div className="boat-result-search-result-filter-align">
        <div className="boat-result-search-result-filter-label">
          <label className="boat-result-search-result-filter-label-price">
            Capacity
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

              color: '#787878'
            }}
          >
            {this.state.values[0]} - {this.state.values[1]}
          </output>
        </div>
        <div
          style={{
            marginRight: '3.0%',
            marginLeft: '3.0%'
          }}
        >
          <Range
            values={this.state.values}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={values => {
              this.setState({ values });
              this.props.handleFilter('capacity', this.state.values);
            }}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: '36px',
                  display: 'flex',
                  width: '100%'
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
                      min: MIN,
                      max: MAX
                    }),
                    alignSelf: 'center'
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
                  outline: 'none'
                }}
              >
                <div
                  style={{
                    height: '10px',
                    width: '5px',
                    backgroundColor: isDragged ? '#548BF4' : '#CCC'
                  }}
                />
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

export default CapacitySliders;
