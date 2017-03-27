import React from 'react';
import { browserHistory } from 'react-router';
import API from '../../api';
import { listToMap } from '../../utils';

class CarSearch extends React.Component {
  constructor(props) {
    super(props);

    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onPriceFromChange = this.onPriceFromChange.bind(this);
    this.onPriceToChange = this.onPriceToChange.bind(this);
    this.onIsExchangeableClick = this.onIsExchangeableClick.bind(this);
    this.onHasImagesClick = this.onHasImagesClick.bind(this);
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
      priceFrom: null,
      priceTo: null,
      isExchangeable: false,
      hasImages: false,
    };
  }

  componentDidMount() {
    API.fetch('/automobiles/search_init/')
      .then((res) => {
        let { cities } = res;
        cities = listToMap(cities, 'key');
        this.setState({ cities });
      })
    ;

    this.fetchCount();
  }

  onCategoryChange(e) {
    this.setState({ category: e.target.value });
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

  onPriceFromChange(e) {
    this.setState({ priceFrom: e.target.value });
    setTimeout(() => {
      this.fetchCount();
    }, 0);
  }

  onPriceToChange(e) {
    this.setState({ priceTo: e.target.value });
    setTimeout(() => {
      this.fetchCount();
    }, 0);
  }

  onHasImagesClick() {
    const { hasImages } = this.state;
    this.setState({ hasImages: !hasImages });
    setTimeout(() => {
      this.fetchCount();
    }, 0);
  }

  onIsExchangeableClick() {
    const { isExchangeable } = this.state;
    this.setState({ isExchangeable: !isExchangeable });
    setTimeout(() => {
      this.fetchCount();
    }, 0);
  }

  onSearch() {
    const query = this.buildQueryString();
    const url = `/automobiles${query}`;
    browserHistory.push(url);
  }

  getSortedItems(collection) {
    const keys = Object.keys(collection).sort();
    return keys.map(x =>
      <option key={ x } value={ collection[x].key }>{ collection[x].value }</option>);
  }

  buildQueryString() {
    const { city, category, priceFrom, priceTo, isExchangeable, hasImages } = this.state;
    let query = `?city=${city}&category=${category}`;

    if (priceFrom) {
      query += `&price_from=${priceFrom}`;
    }

    if (priceTo) {
      query += `&price_to=${priceTo}`;
    }

    if (isExchangeable) {
      query += '&is_exchangeable';
    }

    if (hasImages) {
      query += '&has_images';
    }

    return query;
  }

  fetchCount() {
    const queryString = this.buildQueryString();
    const url = `/automobiles/count/${queryString}`;
    API.fetch(url).then(total => this.setState({ total }));
  }

  render() {
    const { cities, categories, total, hasImages, isExchangeable } = this.state;
    const citiesOpts = this.getSortedItems(cities);
    const categoriesOpts = this.getSortedItems(categories);

    return (
      <div>
        <div>Город <select onChange={ this.onCityChange }>{ citiesOpts }</select></div>
        <div>
          Тип транспорта
          <select onChange={ this.onCategoryChange }>{ categoriesOpts }</select>
        </div>
        <div>
          <div>Цена</div>
          <div>От <input type='number' onChange={ this.onPriceFromChange } /></div>
          <div>До <input type='number' onChange={ this.onPriceToChange } /></div>
        </div>
        <div>
          Только с фото
          <input type='checkbox' onChange={ this.onHasImagesClick } checked={ hasImages } />
        </div>
        <div>Только обмен
          <input
            type='checkbox' onChange={ this.onIsExchangeableClick } checked={ isExchangeable }
          />
        </div>
        <button onClick={ this.onSearch } >Поиск { total > 0 && <span>({ total })</span>}</button>
      </div>
    );
  }
}

export default CarSearch;
