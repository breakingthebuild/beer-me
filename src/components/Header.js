import React from 'react';
import { Link } from 'react-router'; // Importing specific component from the react-router module because of uppercase L

const Header = React.createClass({
  propTypes:{
    siteName: React.PropTypes.string.isRequired
  },
  render() {
    return(
      <h1>
        <Link to="/">{this.props.siteName}</Link>
      </h1>
    )
  }
});

export default Header;
