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
    const localStorageState = JSON.parse(localStorage.getItem('serviceSearch'));
    if (localStorageState) {
      this.timeout = setTimeout(() => this.setState(localStorageState), 0);
    } else {
      API.fetch('/services/search_init/')
        .then((res) => {
          const { cities, categories } = res;
          this.setState({ cities: listToMap(cities, 'key'), categories });
        })
      ;
      this.fetchCount();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
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
    const { path, querySmart } = this.buildQueryString();
    const url = `${path}${querySmart}`;
    const { onModalSubmit } = this.props;
    localStorage.setItem('serviceSearch', JSON.stringify(this.state));

    if (onModalSubmit) {
      onModalSubmit(url);
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
    let querySmart = `?city=${city}`;
    const path = `/services/${category}/`;

    if (priceFrom) {
      query += `&price_from=${priceFrom}`;
      querySmart += `&price_from=${priceFrom}`;
    }

    if (priceTo) {
      query += `&price_to=${priceTo}`;
      querySmart += `&price_to=${priceTo}`;
    }

    return {
      path,
      query,
      querySmart,
    };
  }

  fetchCount() {
    const { query } = this.buildQueryString();
    const url = `/services/count/${query}`;
    API.fetch(url).then(total => this.setState({ total }));
  }

  renderSelectInput(label, options, handler, selectedInput = undefined) {
    return (
      <div className='search-form__row'>
        <div className='search-form__label'>{ label }</div>
        <div className='custom-select'>
          <select
            className='search-form__control search-form__control--select' onChange={ handler }
            value={ selectedInput || undefined }
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
        <Range min={ min } max={ max } tipFormatter={ value => `${value}%` } onChange={ handler } step={ step } value={ [bindMin, bindMax] } />
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

    const renderedCities = this.renderSelectInput('Город', this.getSortedItems(cities), this.onCityChange, this.state.city);
    const renderedCategories = this.renderSelectInput('Тип услуг', this.getSortedItems(categories), this.onCategoryChange, this.state.category);
    const renderPrices = this.renderRangeSlider('Цена', priceFrom, priceTo, 0, 10000000, 10000, this.onPriceFromChange, 'сом');

    return (
      <div className='search-form'>
        <div className='search-form__wrapper'>
          { renderedCities }
          { renderedCategories }
          { renderPrices }
        </div>

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
