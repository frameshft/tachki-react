import React from 'react';
import {connect} from 'react-redux';

import {fetchCompanies as fetchCompaniesAction} from '../../actions/creators/companies';

class Index extends React.Component {
    static propTypes = {
        fetchCompaniesAction: React.PropTypes.func
    };

    componentWillMount() {
        this.props.fetchCompaniesAction();
    }

    render() {
        return (
            <div>Fuck</div>
        )
    }
}

function mapToProps(state) {
    const companiesList = state.companies.get('list');

    return {
        companiesList
    };
}

export default connect(mapToProps, {fetchCompaniesAction})(Index);