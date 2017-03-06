import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import store from '../../store';

import CompanyServices from './company.services';
import ImageModal from '../shared/image.modal';
import { getCompany } from '../../actions/companies';

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

    return (
      <div>
        <div className='company-profile'>
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
            <div className='company-profile__main__row'>
              <div className='company-profile__contact company-profile__contact--phone'>
                <div className='company-profile__contact__row'>
                  <div className='company-profile__contact__label'>
                    Контактная информация
                  </div>
                  <div className='company-profile__contact__value'>
                    { company.phone }
                  </div>
                </div>
              </div>
              <div className='company-profile__contact company-profile__contact--address'>
                <div className='company-profile__contact__row'>
                  <div className='company-profile__contact__label'>
                    Адрес
                  </div>
                  <div className='company-profile__contact__value'>
                    { company.address }
                  </div>
                </div>
              </div>
              <div className='company-profile__contact company-profile__contact--message'>
                <div className='company-profile__contact__row'>
                  <div className='company-profile__contact__label'>
                    Напишите пользователю
                  </div>
                  <div className='company-profile__contact__value'>
                    был(-а) { moment(company.last_login).format('MMMM Do YYYY, hh:mm:ss') }
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showModal &&
            <ImageModal
              image={ company.image }
              alt={ company.name }
              onClose={ this.onModalClose }
            />
          }
        </div>
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
