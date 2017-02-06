import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Application from '../components/Application.jsx';
import Companies from '../components/companies/Index.jsx';

export default (store) => {
    return (
        <Route path="/" component={Application}>
            <IndexRoute components={{main: Companies}}/>
            <Route path="sss" components={{main: Companies}}/>
        </Route>
    );
};
