import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as AuthActions from '../../actions/auth';

import store from '../../store';

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginValue: '',
      passwordValue: '',
      activationCode: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onActivateClick = this.onActivateClick.bind(this);
    this.loginHandle = this.loginHandle.bind(this);
    this.passwordHandle = this.passwordHandle.bind(this);
    this.activationCodeHandle = this.activationCodeHandle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = this.props;
    const user = auth.user;
    if (user !== nextProps.auth.user) {
      browserHistory.push('/');
    }
  }

  onSubmit() {
    const { loginValue, passwordValue } = this.state;
    store.dispatch(AuthActions.registration({ phone: loginValue, password: passwordValue }));
  }

  onActivateClick() {
    const { activationCode } = this.state;
    store.dispatch(AuthActions.activation({ code: activationCode }));
  }

  loginHandle(e) {
    this.setState({
      loginValue: e.target.value,
    });
  }

  passwordHandle(e) {
    this.setState({
      passwordValue: e.target.value,
    });
  }

  activationCodeHandle(e) {
    this.setState({
      activationCode: e.target.value,
    });
  }

  renderRegistration() {
    return (
      <div className='auth-form'>
        <input type='text' style={ { display: 'none' } } />
        <input type='password' style={ { display: 'none' } } />
        <div className='auth-form__row auth-form__row--phone'>
          <input
            type='text'
            placeholder='Login'
            maxLength='9'
            onChange={ this.loginHandle }
            className='auth-form__input'
          />
        </div>
        <div className='auth-form__row'>
          <input
            type='password'
            placeholder='Password'
            onChange={ this.passwordHandle }
            className='auth-form__input'
          />
        </div>
        <div className='auth-form__row auth-form__row--submit text-center'>
          <button onClick={ this.onSubmit } className='btn btn--primary'>
            Registration
          </button>
        </div>
      </div>
    );
  }

  renderActivate() {
    return (
      <div className='auth-form'>
        <div className='auth-form__row'>
          <input
            type='text'
            placeholder='code'
            className='auth-form__input'
            onChange={ this.activationCodeHandle }
          />
        </div>
        <div className='auth-form__row auth-form__row--submit text-center'>
          <button onClick={ this.onActivateClick } className='btn btn--primary'>
            Confirm
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { auth } = this.props;

    return (
      <div>
        { auth.status !== 201 && this.renderRegistration() }
        { auth.status === 201 && this.renderActivate() }
      </div>
    );
  }
}

Registration.propTypes = {
  auth: React.PropTypes.object.isRequired,
};

function mapToProps(state) {
  const auth = state.auth;

  return {
    auth,
  };
}

export default connect(mapToProps)(Registration);
