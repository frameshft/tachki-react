import React from 'react';
import classNames from 'classnames';
import Spinner from '../shared/spinner';

class Img extends React.Component {
  constructor(props) {
    super(props);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.state = { imgLoaded: false };
  }

  componentDidMount() {
    const img = this.node.getBoundingClientRect();
    if (img.complete) {
      this.onImageLoad();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({ imgLoaded: false });
    }
  }

  onImageLoad() {
    if (!this.state.imgLoaded) {
      this.setState({ imgLoaded: true });
    }
  }

  render() {
    return (
      <div className={ classNames('image-wrapper', this.props.wrapperClasses) } onClick={ this.props.onClick }>
        <img
          className={ classNames('image-rendered', this.props.imgClasses, (this.state.imgLoaded) ? '' : 'hidden') }
          src={ this.props.src }
          alt={ this.props.alt }
          onLoad={ this.onImageLoad }
          ref={ (node) => { this.node = node; } }
        />
        <div className={ classNames('image-placeholder', this.props.placeholderClasses, (this.state.imgLoaded) ? 'hidden' : '') } >
          { this.props.children || <Spinner />}
        </div>
      </div>
    );
  }
}

/*eslint-disable */
Img.propTypes = {
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string,
  wrapperClasses: React.PropTypes.oneOfType([React.propTypes.string, React.PropTypes.array]),
  imgClasses: React.PropTypes.oneOfType([React.propTypes.string, React.PropTypes.array]),
  placeholderClasses: React.PropTypes.oneOfType([React.propTypes.string, React.PropTypes.array]),
  onClick: React.PropTypes.func,
  children: React.PropTypes.element,
};
/*eslint-enable */

export default Img;
