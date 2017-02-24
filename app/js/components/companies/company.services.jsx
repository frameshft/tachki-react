import React from 'react';

export default class CompanyServices extends React.Component {
  render() {
    return (
      <div>
        <div>
          { this.props.name }
        </div>
        <div>
          { this.props.services.join(', ') }
        </div>
      </div>
    );
  }
}

CompanyServices.propTypes = {
  name: React.PropTypes.string.isRequired,
  services: React.PropTypes.array.isRequired,
};
