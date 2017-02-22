import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as AuthActions from '../../actions/auth';

import store from '../../store';

class Auth extends React.Component {
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
    store.dispatch(AuthActions.signin({ phone: loginValue, password: passwordValue }));
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
      <div>
        <input type='text' placeholder='Login' onChange={ this.loginHandle } />
        <input type='password' placeholder='Password' onChange={ this.passwordHandle } />
        <button onClick={ this.onSubmit }>Login</button>
      </div>
    );
  }
}

Auth.propTypes = {
  auth: React.PropTypes.object.isRequired,
};

function mapToProps(state) {
  const auth = state.auth;

  return {
    auth,
  };
}

export default connect(mapToProps)(Auth);
