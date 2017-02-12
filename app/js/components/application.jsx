import React from 'react';

import Header from './header/header.jsx';
import Tabber from './header/tabber.jsx';

import '../../style/style.scss';

export default class Application extends React.Component {

  render() {
    return (
      <div className="app">
        <Header/>
        <Tabber />
        {this.props.children}
      </div>
    );
  }
}
