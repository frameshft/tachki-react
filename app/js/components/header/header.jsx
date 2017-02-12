import React from 'react';

import Sidebar from './sidebar.jsx';

import '../../../style/_header.scss';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggleSidebar = this.toggleSidebar.bind(this);

        this.state = {
            showSidebar: false
        };
    }

    toggleSidebar() {
        this.setState({
            showSidebar: !this.state.showSidebar
        })
    }

    render() {
        const {showSidebar} = this.state;
        return (
            <div className="header">
                <div className="sandwich__toggle" onClick={this.toggleSidebar}>

                </div>
                <div className="header__location">
                    главная
                </div>
                <div className="header__tools">
                    <a href="#" className="header__tools__btn header__tools__btn--map"/>
                    <a href="#" className="header__tools__btn header__tools__btn--view
                    header__tools__btn--view--big"/>
                </div>

                {showSidebar && <Sidebar/> }
                <div className={"body-fade fade" + (showSidebar ? " in" : "")} onClick={this.toggleSidebar} />
            </div>
        )
    }
}