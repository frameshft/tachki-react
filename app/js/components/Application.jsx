import React from 'react';
import {connect} from 'react-redux';
import  axios from 'axios';

export default class Application extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            next: null,
            previous: null,
            companies: []
        };

        this.fetchCompanies();
    }

    fetchCompanies() {
        axios.get('http://92.245.109.160:1248/en/react/companies/')
            .then(res => {
                const companies = res.data.results.map(obj => obj);
                const next = res.data.next;
                const previous = res.data.previous;
                this.setState({ companies, next, previous });
            });
    }

    render() {
        return (
            <div className="app">
                <ul>
                    {
                        this.state.companies.map(post => <li key={post.id}><img src={post.image} />{post.name}</li>)
                    }
                </ul>
            </div>
        );
    }
}

/*function mapToProps(state) {
    return {
        ...state
    };
}

export default connect(mapToProps)(Application);*/
