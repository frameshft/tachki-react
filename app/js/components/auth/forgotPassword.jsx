import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as AuthActions from '../../actions/auth';

import store from '../../store';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmitForgot = this.onSubmitForgot.bind(this);
    this.onSubmitChange = this.onSubmitChange.bind(this);
    this.onPhoneHandle = this.onPhoneHandle.bind(this);
    this.onCodeHandle = this.onCodeHandle.bind(this);
    this.onPasswordHandle = this.onPasswordHandle.bind(this);

    this.state = {
      phone: '',
      code: '',
      password: '',
      isChangePassword: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = this.props;
    const user = auth.user;
    if (user !== nextProps.auth.user) {
      browserHistory.push('/companies');
    }
  }

  onSubmitForgot() {
    const mask = '996';
    const phone = mask.concat(this.state.phone);

    store.dispatch(AuthActions.forgotPassword({ phone }))
      .then(() => { this.setState({ isChangePassword: true }); });
  }

  onSubmitChange() {
    store.dispatch(AuthActions.changePassword(
      { phone: this.state.phone, code: this.state.code, password: this.state.password }),
    );
  }

  onPhoneHandle(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onCodeHandle(e) {
    this.setState({
      code: e.target.value,
    });
  }

  onPasswordHandle(e) {
    this.setState({
      password: e.target.value,
    });
  }

  renderForgotPassword() {
    return (
      <div className='auth-form'>
        <div className='auth-form__row auth-form__row--phone'>
          <input
            type='number'
            placeholder='Телефон'
            className='auth-form__input'
            onChange={ this.onPhoneHandle }
          />
        </div>
        <div className='auth-form__row auth-form__row--submit text-center'>
          <button onClick={ this.onSubmitForgot } className='btn btn--primary'>
            Отправить
          </button>
        </div>
      </div>
    );
  }

  renderCreatePassword() {
    return (
      <div className='auth-form'>
        <div className='auth-form__row'>
          <input
            type='text'
            placeholder='Код'
            className='auth-form__input'
            onChange={ this.onCodeHandle }
          />
        </div>
        <div className='auth-form__row'>
          <input
            type='password'
            placeholder='Пароль'
            className='auth-form__input'
            onChange={ this.onPasswordHandle }
          />
        </div>
        <div className='auth-form__row auth-form__row--submit text-center'>
          <button onClick={ this.onSubmitChange } className='btn btn--primary'>
            Изменить
          </button>
        </div>
      </div>
    );
  }

  render() {
    return this.state.isChangePassword ? this.renderCreatePassword() : this.renderForgotPassword();
  }
}

ForgotPassword.propTypes = {
  auth: React.PropTypes.object.isRequired,
};

function mapToProps(state) {
  const auth = state.auth;

  return {
    auth,
  };
}

export default connect(mapToProps)(ForgotPassword);
