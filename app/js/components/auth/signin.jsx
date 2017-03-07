import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import * as AuthActions from '../../actions/auth';

import store from '../../store';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginValue: '',
      passwordValue: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.loginHandle = this.loginHandle.bind(this);
    this.passwordHandle = this.passwordHandle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = this.props;
    const user = auth.user;
    if (user !== nextProps.auth.user) {
      browserHistory.push('/companies');
    }
  }

  onSubmit() {
    const { loginValue, passwordValue } = this.state;
    const mask = '996';
    const login = mask.concat(loginValue);
    store.dispatch(AuthActions.signin({ phone: login, password: passwordValue }))
      .catch((res) => {
      // do something with error
        switch (res.status) {
          default:
            return 'error';
        }
      });
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

  render() {
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
            Login
          </button>
        </div>
        <div className='text-center'>
          <Link to='/forgot-password' className='auth-form__forgot-password'>
            Forgot Password?
          </Link>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  auth: React.PropTypes.object.isRequired,
};

function mapToProps(state) {
  const auth = state.auth;

  return {
    auth,
  };
}

export default connect(mapToProps)(SignIn);
