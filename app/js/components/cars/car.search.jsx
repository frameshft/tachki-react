import React from 'react';
import { browserHistory } from 'react-router';
import { Range } from 'rc-slider';
import API from '../../api';
import { listToMap } from '../../utils';

class CarSearch extends React.Component {
  constructor(props) {
    super(props);

    this.onBrandChange = this.onBrandChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onAutoModelChange = this.onAutoModelChange.bind(this);
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
      priceFrom: 1000000,
      priceTo: 5000000,
      isExchangeable: false,
      hasImages: false,
      automobiles: {},
    };
  }

  componentDidMount() {
    API.fetch('/automobiles/search_init/')
      .then((res) => {
        const { cities, automobiles } = res;
        this.setState({ cities: listToMap(cities, 'key'), automobiles });
      })
    ;

    this.fetchCount();
  }

  onBrandChange(e) {
    const brandId = e.target.value;
    const { automobiles } = this.state;

    if (brandId !== 'all') {
      API.fetch(`/automobiles/${brandId}/models/`)
        .then((res) => {
          if (res.length > 0) {
            automobiles.models = [
              ...[{ id: 'all', name: 'Все' }],
              ...res,
            ];
            automobiles.brand = brandId;
            this.updateSate({ automobiles });
          }
        });
    } else {
      automobiles.models = null;
      automobiles.brand = 'all';
      this.updateSate({ automobiles });
    }
  }

  onCategoryChange(e) {
    const category = e.target.value;
    const { automobiles } = this.state;
    automobiles.models = null;
    this.fetchCategoryAPI(category);
    this.updateSate({ category, automobiles });
  }

  onCityChange(e) {
    const city = e.target.value;
    this.updateSate({ city });
  }

  onAutoModelChange(e) {
    const modelId = e.target.value;
    const { automobiles } = this.state;
    automobiles.model = modelId;
    this.updateSate({ automobiles });
  }

  onPriceFromChange(e) {
    this.setState({
      priceFrom: e[0],
      priceTo: e[1],
    });
  }

  onPriceToChange(e) {
    const priceTo = e.target.value;
    this.updateSate({ priceTo });
  }

  onHasImagesClick() {
    const { hasImages } = this.state;
    this.updateSate({ hasImages: !hasImages });
  }

  onIsExchangeableClick() {
    const { isExchangeable } = this.state;
    this.updateSate({ isExchangeable: !isExchangeable });
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

  updateSate(hash) {
    this.setState({ ...hash }, () => this.fetchCount());
  }

  fetchAutomobileBrands() {
    return API.fetch('/automobiles/brands/')
      .then((res) => {
        const { automobiles } = this.state;

        automobiles.brands = [
          ...[{ id: 'all', name: 'Все' }],
          ...res,
        ];

        this.setState({ automobiles });

        return true;
      })
    ;
  }

  fetchCategoryAPI(category) {
    switch (category) {
      case 'light-new':
      case 'light-old':
        return this.fetchAutomobileBrands();
      default:
        return null;
    }
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

  renderAutomobileBrands(category, brands) {
    const isNull = !(brands && (category === 'light-new' || category === 'light-old'));

    if (isNull) return null;

    return (
      <div className='search-form__row'>
        <div className='search-form__label'>
          Марка
        </div>
        <div className='custom-select'>
          <select
            onChange={ this.onBrandChange }
            className='search-form__control search-form__control--select'
          >
            { brands.map(x => <option key={ x.id } value={ x.id }>{ x.name }</option>) }
          </select>
          <i className='fa fa-caret-down' />
        </div>
      </div>
    );
  }

  renderAutomobileModels(models) {
    if (!models) return null;

    return (
      <div className='search-form__row'>
        <div className='search-form__label'>
          Марка
        </div>
        <div className='custom-select'>
          <select
            onChange={ this.onAutoModelChange }
            className='search-form__control search-form__control--select'
          >
            { models.map(x =>
              <option key={ x.id } value={ x.id } data-min={ x.minYear }>{ x.name }</option>)
            }
          </select>
          <i className='fa fa-caret-down' />
        </div>
      </div>
    );
  }

  render() {
    const {
      cities,
      categories,
      total,
      hasImages,
      isExchangeable,
      automobiles,
      category,
      priceFrom,
      priceTo,
    } = this.state;

    const citiesOpts = this.getSortedItems(cities);
    const categoriesOpts = this.getSortedItems(categories);
    const renderedBrands = this.renderAutomobileBrands(category, automobiles.brands);
    const renderedModels = this.renderAutomobileModels(automobiles.models);

    return (
      <div className='search-form'>
        <div className='search-form__row'>
          <div className='search-form__label'>
            Город
          </div>
          <div className='custom-select'>
            <select
              className='search-form__control search-form__control--select'
              onChange={ this.onCityChange }
            >
              { citiesOpts }
            </select>
            <i className='fa fa-caret-down' />
          </div>
        </div>
        <div className='search-form__row'>
          <div className='search-form__label'>
            Тип транспорта
          </div>
          <div className='custom-select'>
            <select
              className='search-form__control search-form__control--select'
              onChange={ this.onCategoryChange }
            >
              { categoriesOpts }
            </select>
            <i className='fa fa-caret-down' />
          </div>
        </div>
        { renderedBrands }
        { renderedModels }
        <div className='search-form__row search-form__row--slider'>
          <div className='search-form__label'>
            Цена
            <div className='price-slider'>
              <div className='price-slider__from'>
                от {priceFrom} сом
              </div>
              <div className='price-slider__top'>&nbsp;
                до {priceTo} сом
              </div>
            </div>
          </div>
          <Range min={ 0 } max={ 10000000 } tipFormatter={ value => `${value}%` } onChange={ this.onPriceFromChange } step={ 10000 } defaultValue={ [priceFrom, priceTo] } />
        </div>
        <div className='search-form__row'>
          <div className='search-form__label'>
            Инпут
          </div>
          <input
            type='text'
            className='search-form__control search-form__control--input' placeholder='Введите'
          />
        </div>
        <div className='search-form__row search-form__row--checkbox'>
          <div className='search-form__label'>
            Только с фото
          </div>
          <div className='custom-checkbox'>
            <input
              id='photo-checkbox'
              type='checkbox'
              onChange={ this.onHasImagesClick }
              checked={ hasImages } className='search-form__control custom-checkbox__input'
            />
            <label className='custom-checkbox__label' htmlFor='photo-checkbox' />
          </div>
        </div>
        <div className='search-form__row search-form__row--checkbox'>
          <div className='search-form__label'>
            Только обмен
          </div>
          <div className='custom-checkbox'>
            <input
              type='checkbox'
              id='exchange-checkbox'
              onChange={ this.onIsExchangeableClick } checked={ isExchangeable }
              className='search-form__control custom-checkbox__input'
            />
            <label className='custom-checkbox__label' htmlFor='exchange-checkbox' />
          </div>
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

export default CarSearch;
