import React from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import moment from 'moment';
import store from '../../store';

import CompanyServices from './company.services';
import ImageModal from '../shared/image.modal';
import { getCompany } from '../../actions/companies';
import ContactInfo from '../shared/profile.contact.info';

import '../../../style/profile.scss';

class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.onModalClose = this.onModalClose.bind(this);
    this.onModalShow = this.onModalShow.bind(this);

    this.state = {
      showModal: false,
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

  render() {
    const { company } = this.props;
    const { showModal } = this.state;

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
            <ContactInfo post={ company } parentCls='company-profile__main__row' />
          </div>
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
                <button className='button__transparent btn--bookmark' />
                <button className='button__transparent btn--edit' />
                <button className='button__transparent btn--marker'>
                  Показать на карте
                </button>
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
            />
          </div>
        </MediaQuery>
      </div>
    );
  }
}

CompanyProfile.propTypes = {
  company: React.PropTypes.object.isRequired,
};


function mapToProps(state, props) {
  const companies = state.entities.users;
  const company = companies[props.params.id] || {};

  return {
    company,
  };
}

export default connect(mapToProps)(CompanyProfile);
