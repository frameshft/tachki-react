import React from 'react';
import { browserHistory } from 'react-router';
import { Range } from 'rc-slider';
import API from '../../api';
import { listToMap } from '../../utils';

class SpareSearch extends React.Component {
  constructor(props) {
    super(props);

    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onPriceFromChange = this.onPriceFromChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onConditionClick = this.onConditionClick.bind(this);
    this.onAutomobileBrandClick = this.onAutomobileBrandClick.bind(this);
    this.onAutomobileModelClick = this.onAutomobileModelClick.bind(this);
    this.onWheelTypeClick = this.onWheelTypeClick.bind(this);
    this.onTireTypeClick = this.onTireTypeClick.bind(this);
    this.onDiameterClick = this.onDiameterClick.bind(this);

    this.state = {
      total: 0,
      category: 'all',
      city: 'all',
      cities: {},
      categories: [
        { key: 'all', value: 'Все' },
      ],
      automobiles: {
        brands: [],
        brand: null,
        models: [],
        model: null,

      },
      priceFrom: 0,
      priceTo: 10000000,
      condition: 'all',
      conditions: [
        { key: 'all', value: 'Все' },
        { key: 'new', value: 'Новые' },
        { key: 'used', value: 'Б/У' },
      ],
      wheels: {},
      tires: {},
    };
  }

  componentDidMount() {
    API.fetch('/spare-parts/search_init/')
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
    this.fetchAPIData(category);
  }

  onAutomobileBrandClick(e) {
    const brand = e.target.value;
    const { automobiles } = this.state;
    automobiles.brand = brand;
    this.updateSate({ automobiles });

    switch (brand) {
      case 'all':
        automobiles.models = [{ id: 'all', name: 'Все' }];
        this.setState({ automobiles });
        break;
      default:
        API.fetch(`/automobiles/${brand}/models/`)
          .then((res) => {
            if (res.length > 0) {
              automobiles.models = [
                ...[{ id: 'all', name: 'Все' }],
                ...res,
              ];
              this.setState({ automobiles });
            }
          });
        break;
    }
  }

  onWheelTypeClick(e) {
    const type = e.target.value;
    const { wheels } = this.state;
    wheels.type = type;
    this.updateSate({ wheels });
  }

  onTireTypeClick(e) {
    const type = e.target.value;
    const { tires } = this.state;
    tires.type = type;
    this.updateSate({ tires });
  }

  onDiameterClick(e) {
    const diameter = e.target.value;
    const { wheels } = this.state;
    wheels.diameter = diameter;
    this.updateSate({ wheels });
  }

  onAutomobileModelClick(e) {
    const model = e.target.value;
    const { automobiles } = this.state;
    automobiles.model = model;
    this.updateSate({ automobiles });
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

  onConditionClick(e) {
    const condition = e.target.value;
    this.updateSate({ condition });
  }

  getSortedItems(collection) {
    const keys = Object.keys(collection).sort();
    return keys.map(x =>
      <option key={ x } value={ collection[x].key }>{ collection[x].value }</option>);
  }

  getSortedItemsByIdName(collection) {
    const keys = Object.keys(collection).sort();
    return keys.map(x =>
      <option key={ x } value={ collection[x].id }>{ collection[x].name }</option>);
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
    const url = `/spare-parts/count/${queryString}`;
    API.fetch(url).then(total => this.setState({ total }));
  }

  fetchAPIData(category) {
    switch (category) {
      case 'sale_spare':
      case 'auto_spare':
        return API.fetch('/automobiles/brands/')
          .then((res) => {
            const { automobiles } = this.state;

            automobiles.brands = [
              ...[{ id: 'all', name: 'Все' }],
              ...res,
            ];

            automobiles.models = [
              { id: 'all', name: 'Все' },
            ];

            this.setState({ automobiles });
            return true;
          })
          ;
      case 'wheels':
        return API.fetch('/spare-parts/wheels_config/')
          .then((res) => {
            const { wheels } = this.state;

            wheels.types = res.types;
            wheels.diameters = res.diameters;

            this.setState({ wheels });
            return true;
          })
          ;
      case 'tires':
        return API.fetch('/spare-parts/tires_config/')
          .then((res) => {
            const { tires } = this.state;

            tires.types = res.types;
            tires.diameters = res.diameters;
            tires.profiles = res.profiles;
            tires.profileWidths = res.profileWidths;

            this.setState({ tires });
            return true;
          })
          ;
      default:
        return null;
    }
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

  renderToggler(label, labelFor, toggler, handler) {
    return (
      <div className='search-form__row search-form__row--checkbox'>
        <div className='search-form__label'>
          { label }
        </div>
        <div className='custom-checkbox'>
          <input
            id={ labelFor }
            type='checkbox'
            onChange={ handler }
            checked={ toggler } className='search-form__control custom-checkbox__input'
          />
          <label className='custom-checkbox__label' htmlFor={ labelFor } />
        </div>
      </div>
    );
  }

  renderCategoryControls(category) {
    switch (category) {
      case 'sale_spare':
        return this.renderSaleSpareControls();
      case 'wheels':
        return this.renderWheelsControls();
      case 'tire':
        return this.renderTiresControls();
      case 'consumables':
      case 'multimedia':
      case 'auto_spare':
      default :
        return null;
    }
  }

  renderSaleSpareControls() {
    const {
      conditions,
      automobiles,
    } = this.state;
    return (
      <div>
        { this.renderSelectInput('Состояние', this.getSortedItems(conditions || {}), this.onConditionClick) }
        { this.renderSelectInput('Марка', this.getSortedItemsByIdName(automobiles.brands || {}), this.onAutomobileBrandClick) }
        { this.renderSelectInput('Модель', this.getSortedItemsByIdName(automobiles.models || {}), this.onAutomobileModelClick) }
      </div>
    );
  }

  renderWheelsControls() {
    const {
      conditions,
      wheels,
    } = this.state;
    return (
      <div>
        { this.renderSelectInput('Состояние', this.getSortedItems(conditions || {}), this.onConditionClick) }
        { this.renderSelectInput('Тип дисков', this.getSortedItems(wheels.types || {}), this.onWheelTypeClick) }
        { this.renderSelectInput('Диаметр', this.getSortedItems(wheels.diameters || {}), this.onDiameterClick) }
      </div>
    );
  }

  renderTiresControls() {
    const {
      conditions,
      tires,
    } = this.state;
    return (
      <div>
        { this.renderSelectInput('Состояние', this.getSortedItems(conditions || {}), this.onConditionClick) }
        { this.renderSelectInput('Тип шин', this.getSortedItems(tires.types || {}), this.onTireTypeClick) }
        { this.renderSelectInput('Профиль', this.getSortedItems(tires.profiles || {}), this.onWheelTypeClick) }
        { this.renderSelectInput('Ширина', this.getSortedItems(tires.profileWidths || {}), this.onWheelTypeClick) }
        { this.renderSelectInput('Диаметр', this.getSortedItems(tires.diameters || {}), this.onDiameterClick) }
      </div>
    );
  }

  render() {
    const {
      cities,
      category,
      categories,
      priceFrom,
      priceTo,
      total,
    } = this.state;

    const renderedCities = this.renderSelectInput('Город', this.getSortedItems(cities), this.onCityChange);
    const renderedCategories = this.renderSelectInput('Тип запчасти', this.getSortedItems(categories), this.onCategoryChange);
    const renderPrices = this.renderRangeSlider('Цена', priceFrom, priceTo, 0, 10000000, 10000, this.onPriceFromChange, 'сом');

    return (
      <div className='search-form'>
        { renderedCategories }
        { this.renderCategoryControls(category) }
        { renderedCities }
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

export default SpareSearch;
