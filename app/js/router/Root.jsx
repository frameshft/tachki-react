import React from 'react';
import {ReduxRouter} from 'redux-router';

import getRoutes from './routes';

export default class Root extends React.Component {
    render() {
        return (
            <ReduxRouter>
                {getRoutes(this.props.store)}
            </ReduxRouter>
        );
    }
}
