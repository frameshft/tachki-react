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
      browserHistory.push('/companies');
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
      <div>
        <input type='text' placeholder='Login' onChange={ this.loginHandle } />
        <input type='password' placeholder='Password' onChange={ this.passwordHandle } />
        <button onClick={ this.onSubmit }>Registration</button>
      </div>
    );
  }

  renderActivate() {
    return (
      <div>
        <input type='text' onChange={ this.activationCodeHandle } />
        <button onClick={ this.onActivateClick }>confirm</button>
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
