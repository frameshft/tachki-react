import React from 'react';
import { browserHistory } from 'react-router';
import API from '../../api';
import { listToMap } from '../../utils';

class CompanySearch extends React.Component {
  constructor(props) {
    super(props);

    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onServiceChange = this.onServiceChange.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      total: 0,
      category: 'all',
      services: null,
      service: null,
      city: 'all',
      cities: {},
      categories: {},
    };
  }

  componentDidMount() {
    API.fetch('/companies/search_init/')
      .then((res) => {
        let { cities, categories } = res;
        cities = listToMap(cities, 'key');
        categories = listToMap(categories, 'key');
        this.setState({ cities, categories });
      })
    ;

    this.fetchCount();
  }

  onCategoryChange(e) {
    const { services } = this.state.categories[e.target.value];
    this.setState({ category: e.target.value, services, service: null });
    setTimeout(() => {
      this.fetchCount();
    }, 0);
  }

  onCityChange(e) {
    this.setState({ city: e.target.value });
    setTimeout(() => {
      this.fetchCount();
    }, 0);
  }

  onServiceChange(e) {
    let service = this.state.service;

    if (!service) {
      service = [];
    }

    if (!e.target.checked) {
      service = service.filter(x => x !== e.target.value);
    } else {
      service.push(e.target.value);
    }

    if (service.length < 1) {
      service = null;
    }

    this.setState({ service });
    setTimeout(() => {
      this.fetchCount();
    }, 0);
  }

  onSearch() {
    const query = this.buildQueryString();
    const url = `/companies${query}`;
    browserHistory.push(url);
  }

  getSortedItems(collection) {
    const keys = Object.keys(collection).sort();
    return keys.map(x =>
      <option key={ x } value={ collection[x].key }>{ collection[x].value }</option>);
  }

  buildQueryString() {
    const { city, category, service } = this.state;
    let query = `?city=${city}&category=${category}`;
    if (service) {
      query += `&${service.map(x => `services=${x}`).join('&')}`;
    }

    return query;
  }

  fetchCount() {
    const queryString = this.buildQueryString();
    const url = `/companies/count/${queryString}`;
    API.fetch(url).then(total => this.setState({ total }));
  }

  render() {
    const { cities, categories, services, total } = this.state;
    const citiesOpts = this.getSortedItems(cities);
    const categoriesOpts = this.getSortedItems(categories);
    const servicesOpts = !services ? null : services.map(x => (
      <li key={ x.key }>
        <input type='checkbox' name='sevice' value={ x.key } onChange={ this.onServiceChange } />
        { x.value }
      </li>
    ));

    return (
      <div>
        <div>Категория <select onChange={ this.onCategoryChange }>{ categoriesOpts }</select></div>
        { servicesOpts && <div>Тип <ul>{ servicesOpts }</ul></div>}
        <div>Город <select onChange={ this.onCityChange }>{ citiesOpts }</select></div>
        <button onClick={ this.onSearch } >Поиск { total > 0 && <span>({ total })</span>}</button>
      </div>
    );
  }
}

export default CompanySearch;
