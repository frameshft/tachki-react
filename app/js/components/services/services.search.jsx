import React from 'react';
import { browserHistory } from 'react-router';
import { Range } from 'rc-slider';
import API from '../../api';
import { listToMap } from '../../utils';

class ServicesSearch extends React.Component {
  constructor(props) {
    super(props);

    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onPriceFromChange = this.onPriceFromChange.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      total: 0,
      category: 'all',
      city: 'all',
      cities: {},
      categories: [
        { key: 'all', value: 'Все' },
        { key: 'light-new', value: 'Легковые новые' },
        { key: 'light-old', value: 'Легковые с пробегом' },
        { key: 'motor', value: 'Мото техника' },
        { key: 'water', value: 'Водный транспорт' },
      ],
      priceFrom: 0,
      priceTo: 10000000,
    };
  }

  componentDidMount() {
    API.fetch('/services/search_init/')
      .then((res) => {
        const { cities, categories } = res;
        this.setState({ cities: listToMap(cities, 'key'), categories });
      })
    ;

    this.fetchCount();
  }

  onCategoryChange(e) {
    const category = e.target.value;
    this.updateSate({ category });
  }

  onCityChange(e) {
    const city = e.target.value;
    this.updateSate({ city });
  }

  onPriceFromChange(e) {
    this.updateSate({
      priceFrom: e[0],
      priceTo: e[1],
    });
  }

  onSearch() {
    const query = this.buildQueryString();
    const url = `/services${query}`;
    const { onModalSubmit } = this.props;

    if (onModalSubmit) {
      onModalSubmit(query);
    } else {
      browserHistory.push(url);
    }
  }

  getSortedItems(collection) {
    const keys = Object.keys(collection).sort();
    return keys.map(x =>
      <option key={ x } value={ collection[x].key }>{ collection[x].value }</option>);
  }

  updateSate(hash) {
    this.setState({ ...hash }, () => this.fetchCount());
  }

  buildQueryString() {
    const { city,
      category,
      priceFrom,
      priceTo,
    } = this.state;

    let query = `?city=${city}&category=${category}`;

    if (priceFrom) {
      query += `&price_from=${priceFrom}`;
    }

    if (priceTo) {
      query += `&price_to=${priceTo}`;
    }

    return query;
  }

  fetchCount() {
    const queryString = this.buildQueryString();
    const url = `/services/count/${queryString}`;
    API.fetch(url).then(total => this.setState({ total }));
  }

  renderSelectInput(label, options, handler) {
    return (
      <div className='search-form__row'>
        <div className='search-form__label'>{ label }</div>
        <div className='custom-select'>
          <select
            className='search-form__control search-form__control--select' onChange={ handler }
          >{ options }</select>
          <i className='fa fa-caret-down' />
        </div>
      </div>
    );
  }

  renderRangeSlider(label, bindMin, bindMax, min, max, step, handler, suffix = '') {
    return (
      <div className='search-form__row search-form__row--slider'>
        <div className='search-form__label'>
          { label }
          <div className='price-slider'>
            <div className='price-slider__from'>от { bindMin } { suffix }</div>
            <div className='price-slider__top'>&nbsp;до { bindMax } { suffix }</div>
          </div>
        </div>
        <Range min={ min } max={ max } tipFormatter={ value => `${value}%` } onChange={ handler } step={ step } defaultValue={ [bindMin, bindMax] } />
      </div>
    );
  }

  render() {
    const {
      cities,
      categories,
      priceFrom,
      priceTo,
      total,
    } = this.state;

    const renderedCities = this.renderSelectInput('Город', this.getSortedItems(cities), this.onCityChange);
    const renderedCategories = this.renderSelectInput('Тип транспорта', this.getSortedItems(categories), this.onCategoryChange);
    const renderPrices = this.renderRangeSlider('Цена', priceFrom, priceTo, 0, 10000000, 10000, this.onPriceFromChange, 'сом');

    return (
      <div className='search-form'>
        { renderedCities }
        { renderedCategories }
        { renderPrices }

        <div className='search-form__row'>
          <button className='search-form__submit' onClick={ this.onSearch } >
            Поиск { total > 0 && <span>({ total })</span> }
          </button>
        </div>
      </div>
    );
  }
}

export default ServicesSearch;
