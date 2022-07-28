import React from 'react';
import { Input, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { location } from '../../../actions';
import history from '../../../history';

import './search.css';

class Search extends React.Component {
  state = { location: '' };

  componentDidUpdate() {
    this.props.location(this.state.location);
  }

  render() {
    return (
      <Input
        iconPosition="left"
        size={this.props.size}
        action={{
          content: 'Search',
          size: `${this.props.size}`,
          color: 'red',
          onClick: () => history.push('/boatResult'),
        }}
        icon="map marker alternate"
        placeholder="Search..."
        className="search-container"
        onChange={(event) => this.setState({ location: event.target.value })}
        focus
      />
    );
  }
}

export default connect(null, { location })(Search);
