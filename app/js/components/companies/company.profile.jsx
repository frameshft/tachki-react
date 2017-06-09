import React from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import store from '../../store';

import CompanyServices from './company.services';
import CompanyPosts from './companies.posts';
import ImageModal from '../shared/image.modal';
import { getCompany } from '../../actions/companies';
import ContactInfo from '../shared/profile.contact.info';

import '../../../style/profile.scss';
import PostMap from '../shared/map.post';

class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.onModalClose = this.onModalClose.bind(this);
    this.onModalShow = this.onModalShow.bind(this);

    this.onMapModalClose = this.onMapModalClose.bind(this);
    this.onMapModalShow = this.onMapModalShow.bind(this);

    this.state = {
      showModal: false,
      showMapModal: false,
      postsPage: 1,
    };

    moment.locale('ru');
  }

  componentDidMount() {
    store.dispatch(getCompany(this.props.params.id));
  }

  onModalClose() {
    this.setState({
      showModal: false,
    });
  }

  onModalShow() {
    this.setState({
      showModal: true,
    });
  }

  onMapModalClose() {
    this.setState({
      showMapModal: false,
    });
  }

  onMapModalShow() {
    this.setState({
      showMapModal: true,
    });
  }

  render() {
    const { company } = this.props;
    const { showModal, showMapModal } = this.state;

    if (company.id === undefined) {
      return null;
    }

    let services = [];

    if (company.services !== undefined) {
      const keys = Object.keys(company.services);
      services = keys.map((x, i) =>
        <CompanyServices key={ i } name={ x } services={ company.services[x] } />,
      );
    }

    const contactPhone = company.contactPhone || company.phone;

    return (
      <div className='company-profile'>
        <Helmet>
          <title>{ company.htmlTitle }</title>
          <meta name='description' content={ company.htmlDescription } />
          <meta property='og:title' content={ company.htmlTitle } />
          <meta property='og:description' content={ company.htmlDescription } />
        </Helmet>
        <MediaQuery maxWidth={ 767 }>
          <div className='company-profile__media'>
            <button className='button__transparent' onClick={ this.onModalShow }>
              <img
                src={ company.image }
                alt={ company.name }
                className='company-profile__media__img'
              />
            </button>
          </div>
          <div className='company-profile__name'>
            { company.name }
          </div>
          <div className='company-profile__main'>
            <div className='company-profile__main__row'>
              <h3 className='company-profile__main__title'>О компании</h3>
              <div className='company-profile__main__description'>
                { company.profile_info }
              </div>
            </div>
            <div className='company-profile__main__row'>
              <h3 className='company-profile__main__title'>Предоставляемые услуги</h3>
              <div className='company-profile__main__description'>
                { services }
              </div>
            </div>
            <ContactInfo
              post={ company } parentCls='company-profile__main__row'
              onAddressClick={ this.onModalClose }
            />
          </div>
          <CompanyPosts company={ company } />
          {showModal &&
            <ImageModal
              image={ company.image }
              alt={ company.name }
              onClose={ this.onModalClose }
            />
          }
        </MediaQuery>

        <MediaQuery minWidth={ 767 }>
          <div className='company-profile__top'>
            <div className='company-profile__media'>
              <img
                src={ company.image }
                alt={ company.name }
                className='company-profile__media__img'
              />
            </div>
            <div className='company-profile__summary'>
              <h1 className='company-profile__name'>
                { company.name }
              </h1>
              <div className='company-profile__address'>
                { company.address }
              </div>
            </div>
            <div className='company-profile__top__right'>
              <div className='company-profile__top__contact'>
                Контактный телефон
                <div className='company-profile__top__contact__value'>
                  { contactPhone }
                </div>
              </div>
              <div className='company-profile__top__controls'>
                {/* TODO: add crud */}
                {/* <button className='button__transparent btn--edit' /> */}
                {/* <button className='button__transparent btn--marker' onClick={ this.onMapModalShow }>
                  Показать на карте
                </button> */}
              </div>
            </div>
          </div>
          <div className='company-profile__main'>
            <div className='company-profile__main__row'>
              <h3 className='company-profile__main__title'>О компании</h3>
              <div className='company-profile__main__description'>
                { company.profile_info }
              </div>
            </div>
            <div className='company-profile__main__row'>
              <h3 className='company-profile__main__title'>Предоставляемые услуги</h3>
              <div className='company-profile__main__description'>
                { services }
              </div>
            </div>
            <ContactInfo
              post={ company }
              parentCls='company-profile__main__row company-profile__main__row--contacts'
              onAddressClick={ this.onMapModalShow }
            />
          </div>
          <CompanyPosts company={ company } />
        </MediaQuery>
        {showMapModal &&
        <PostMap
          center={ [company.latitude, company.longitude] }
          lat={ company.latitude }
          lng={ company.longitude }
          onClose={ this.onMapModalClose }
        />
        }
      </div>
    );
  }
}

CompanyProfile.propTypes = {
  company: React.PropTypes.object.isRequired,
};


function mapToProps(state, props) {
  const postType = props.postType || props.route.postType;
  const companies = state.entities.users;
  const allPosts = state.entities.posts;
  const company = companies[props.params.id] || {};
  const companyPosts = company.posts || [];
  const posts = companyPosts.map(x => allPosts[x]).filter(x => !!x);
  return {
    company,
    posts,
    postType,
  };
}

export default connect(mapToProps)(CompanyProfile);
