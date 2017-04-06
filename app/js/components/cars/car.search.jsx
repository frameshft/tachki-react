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
    this.onYearChange = this.onYearChange.bind(this);
    this.onMileageChange = this.onMileageChange.bind(this);

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
      isExchangeable: false,
      hasImages: false,
      automobiles: {},
      yearFrom: null,
      yearTo: null,
      yearCurrentFrom: null,
      yearCurrentTo: null,
      yearSelected: null,
      mileageFrom: 0,
      mileageTo: 1000000,
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
    const { models, generations } = this.initAutomobileFilters();

    if (brandId !== 'all') {
      API.fetch(`/automobiles/${brandId}/models/`)
        .then((res) => {
          if (res.length > 0) {
            automobiles.models = [
              ...[{ id: 'all', name: 'Все' }],
              ...res,
            ];
            automobiles.brand = brandId;
            automobiles.generations = generations;
            this.updateSate({ automobiles });
          }
        });
    } else {
      automobiles.models = models;
      automobiles.generations = generations;
      automobiles.brand = 'all';
      this.updateSate({ automobiles });
    }
  }

  onCategoryChange(e) {
    const category = e.target.value;
    const { automobiles } = this.state;
    this.fetchCategoryAPI(category);
    this.updateSate({ category, automobiles });
  }

  onCityChange(e) {
    const city = e.target.value;
    this.updateSate({ city });
  }

  onAutoModelChange(e) {
    const modelId = e.target.value;
    const selectedOptionDataSet = e.target.children[e.target.selectedIndex].dataset;
    const yearCurrentFrom = null;
    const yearCurrentTo = null;
    const { generations } = this.initAutomobileFilters();

    let yearFrom = null;
    let yearTo = null;

    const { automobiles } = this.state;
    automobiles.model = modelId;
    automobiles.generations = generations;

    if (selectedOptionDataSet.minyear) {
      yearFrom = selectedOptionDataSet.minyear;
      yearTo = selectedOptionDataSet.maxyear || 2017;
    }
    if (modelId !== 'all') {
      this.fetchGeneration(yearFrom, yearTo);
    }
    this.updateSate({ automobiles, yearFrom, yearTo, yearCurrentFrom, yearCurrentTo });
  }

  onYearChange(e) {
    const yearCurrentFrom = e[0];
    const yearCurrentTo = e[1];
    this.fetchGeneration(yearCurrentFrom, yearCurrentTo);
  }

  onMileageChange(e) {
    const mileageFrom = e[0];
    const mileageTo = e[1];
    this.updateSate({ mileageFrom, mileageTo });
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

  fetchGeneration(yearCurrentFrom, yearCurrentTo) {
    const { automobiles } = this.state;
    const url = `/automobiles/${automobiles.model}/generations/?year-from=${yearCurrentFrom}&year-to=${yearCurrentTo}`;

    this.updateSate({ yearCurrentFrom, yearCurrentTo });
    automobiles.generations = null;

    API.fetch(url)
      .then((res) => {
        if (res.length > 0) {
          automobiles.generations = [
            ...[{ id: 'all', name: 'Все' }],
            ...res,
          ];
          this.updateSate({ automobiles });
        }
      })
    ;
  }

  updateSate(hash) {
    this.setState({ ...hash }, () => this.fetchCount());
  }

  initAutomobileFilters() {
    return {
      models: [{ id: 'all', name: 'Все' }],
      generations: [{ id: 'all', name: 'Все' }],
    };
  }

  fetchAutomobileBrands() {
    return API.fetch('/automobiles/brands/')
      .then((res) => {
        const { automobiles } = this.state;

        const { models, generations } = this.initAutomobileFilters();
        automobiles.brands = [
          ...[{ id: 'all', name: 'Все' }],
          ...res,
        ];

        automobiles.models = models;
        automobiles.generations = generations;

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
    const { city,
      category,
      priceFrom,
      priceTo,
      isExchangeable,
      hasImages,
      automobiles,
    } = this.state;

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

    if (automobiles.brand) {
      query += `&brand=${automobiles.brand}`;
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
          Модель
        </div>
        <div className='custom-select'>
          <select
            onChange={ this.onAutoModelChange }
            className='search-form__control search-form__control--select'
          >
            { models.map(x =>
              <option
                key={ x.id } value={ x.id } data-minYear={ x.minYear } data-maxYear={ x.maxYear }
              >
                { x.name }
              </option>)
            }
          </select>
          <i className='fa fa-caret-down' />
        </div>
      </div>
    );
  }

  renderAutomobileGenerations(generations) {
    if (!generations) return null;

    return (
      <div className='search-form__row'>
        <div className='search-form__label'>
          Поколение
        </div>
        <div className='custom-select'>
          <select
            // onChange={ this.onAutoModelChange }
            className='search-form__control search-form__control--select'
          >
            { generations.map(x =>
              <option key={ x.id } value={ x.id }>
                { x.name }
              </option>)
            }
          </select>
          <i className='fa fa-caret-down' />
        </div>
      </div>
    );
  }

  renderedYear(from, to, currentFrom, currentTo) {
    if (!from || !to) return null;

    const b = +from;
    const e = +to;

    return (<div className='search-form__row search-form__row--slider'>
      <div className='search-form__label'>
        Год
        <div className='price-slider'>
          <div className='price-slider__from'>
            от { currentFrom || from }
          </div>
          <div className='price-slider__top'>&nbsp;
            до { currentTo || to }
          </div>
        </div>
      </div>
      <Range min={ b } max={ e } tipFormatter={ value => `${value}%` } onChange={ this.onYearChange } value={ [currentFrom || b, currentTo || e] } />
    </div>);
  }

  renderedMileage(from, to) {
    const { mileageFrom, mileageTo } = this.state;
    return (<div className='search-form__row search-form__row--slider'>
      <div className='search-form__label'>
        Пробег
        <div className='price-slider'>
          <div className='price-slider__from'>
            от { mileageFrom }
          </div>
          <div className='price-slider__top'>&nbsp;
            до { mileageTo }
          </div>
        </div>
      </div>
      <Range min={ from } max={ to } tipFormatter={ value => `${value}%` } onChange={ this.onMileageChange } defaultValue={ [from, to] } />
    </div>);
  }

  // renderAutoConditiions(conditions) {
  //   const opts = conditions.map(x => <option key={ x.key } value={ x.key }>{ x.value }</option>);
  //
  // }
  //

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
      yearFrom,
      yearTo,
      yearCurrentFrom,
      yearCurrentTo,
    } = this.state;

    const citiesOpts = this.getSortedItems(cities);
    const categoriesOpts = this.getSortedItems(categories);
    const renderedBrands = this.renderAutomobileBrands(category, automobiles.brands);
    const renderedModels = this.renderAutomobileModels(automobiles.models);
    const renderedGenerations = this.renderAutomobileGenerations(automobiles.generations);
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
        { this.renderedYear(yearFrom, yearTo, yearCurrentFrom, yearCurrentTo) }

        { renderedGenerations }
        { this.renderedMileage(0, 1000000) }

        <div className='search-form__row search-form__row--slider'>
          <div className='search-form__label'>
            Цена
            <div className='price-slider'>
              <div className='price-slider__from'>от {priceFrom} сом</div>
              <div className='price-slider__top'>&nbsp;до {priceTo} сом</div>
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
