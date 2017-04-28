import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => <div className='marker map' />;

class PostMap extends React.Component {
  render() {
    const { center, items, zoom, onClose } = this.props;
    return (
      <div>
        <div className='modal fade in'>
          <div className='modal-dialog modal-dialog--image'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button
                  className='button__transparent modal-close'
                  onClick={ onClose }
                  title='Закрыть окно'
                >
                  <i className='fa fa-times' />
                </button>
              </div>
              <div className='modal-body' style={ { height: '500px' } }>
                <GoogleMapReact
                  bootstrapURLKeys={ { key: 'AIzaSyCkR4kBDL0gHJD6lUQAA2LziSC5qJNVP7s' } }
                  center={ center }
                  zoom={ zoom }
                >
                  { items.forEach((x, i) => <AnyReactComponent lat={ x.lat } lng={ x.lng } key={ i } />) }
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </div>
        <div className='modal-backdrop fade in' />
      </div>
    );
  }
}

PostMap.PropTypes = {
  center: React.PropTypes.array,
  zoom: React.PropTypes.number,
  items: React.PropTypes.array.isRequired,
};

PostMap.defaultProps = {
  zoom: 17,
  center: [77, 77],
};

export default PostMap;
