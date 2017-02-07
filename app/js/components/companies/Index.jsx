import React from 'react';
import {connect} from 'react-redux';

import {fetchCompanies as fetchCompaniesAction} from '../../actions/creators/companies';

class Index extends React.Component {
    static propTypes = {
        fetchCompaniesAction: React.PropTypes.func,
        companies: React.PropTypes.object
    };

    componentWillMount() {
        this.props.fetchCompaniesAction();
    }

    render() {
        const {companies} = this.props;
        const fetching = companies.get('fetching');
        const status = companies.get('status');

        const companyItem = [];

        if (!fetching && status === 1) {
            const list = companies.get('list');

            list.map(function(item) {
                companyItem.push(<li key={item.id}><img src={item.image} />{item.name}</li>);
            })
        }


        return (
            <div>
                <ul>
                    {companyItem}
                </ul>
            </div>
        )
    }
}

function mapToProps(state) {
    const companies = state.companies;

    return {
        companies
    };
}

export default connect(mapToProps, {fetchCompaniesAction})(Index);