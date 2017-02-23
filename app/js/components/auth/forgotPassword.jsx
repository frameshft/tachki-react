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
    store.dispatch(AuthActions.forgotPassword({ phone: this.state.phone }))
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
      <div>
        <input type='number' onChange={ this.onPhoneHandle } />
        <button onClick={ this.onSubmitForgot }>Send</button>
      </div>
    );
  }

  renderCreatePassword() {
    return (
      <div>
        <input type='text' onChange={ this.onCodeHandle } />
        <input type='password' onChange={ this.onPasswordHandle } />
        <button onClick={ this.onSubmitChange }>Change</button>
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
