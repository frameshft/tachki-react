import React from 'react';

export default class CompanyServices extends React.Component {
  render() {
    return (
      <div>
        <div>
          { this.props.services.join(', ') }
        </div>
      </div>
    );
  }
}

CompanyServices.propTypes = {
  services: React.PropTypes.array.isRequired,
};
