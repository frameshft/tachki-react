import React from 'react';

export default class extends React.Component {
    static PropTypes= {
        company: React.PropTypes.object.isRequired
    };

    render() {
        const {company} = this.props;
        const types = company.types;

        return (
            <div className="list__item">
                <div className="list__item__left">
                    <div className="list__item__media">
                        <img src={company.image} className="list__item__media__img" alt={company.name}/>
                    </div>
                </div>
                <div className="list__item__content">
                    <h3 className="list__item__title">
                        {company.name}
                    </h3>
                    {company["profile_info"] && <div className="list__item__description">
                        {company["profile_info"]}
                    </div>}
                    <div className="list__item__category">
                        {types.map(function(type) {
                            return <span key={type}>{type}</span>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}