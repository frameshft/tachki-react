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
    this.onWheelDiameterClick = this.onWheelDiameterClick.bind(this);
    this.onTireDiameterClick = this.onTireDiameterClick.bind(this);
    this.onTireWidthClick = this.onTireWidthClick.bind(this);
    this.onTireProfileClick = this.onTireProfileClick.bind(this);

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
    const localStorageState = JSON.parse(localStorage.getItem('partsSearch'));
    if (localStorageState) {
      this.timeout = setTimeout(() => this.setState(localStorageState), 0);
    } else {
      API.fetch('/spare-parts/search_init/')
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
    const { automobiles, wheels, tires } = this.state;
    let { condition, city, priceFrom, priceTo } = this.state;

    condition = 'all';
    priceFrom = 0;
    priceTo = 10000000;
    city = 'all';
    automobiles.brand = null;
    automobiles.model = null;
    wheels.type = null;
    wheels.diameter = null;
    tires.type = null;
    tires.profile = null;
    tires.profileWidth = null;
    tires.diameter = null;

    this.updateSate({
      category,
      condition,
      priceFrom,
      priceTo,
      city,
      automobiles,
      wheels,
      tires,
    });
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

  onTireProfileClick(e) {
    const type = e.target.value;
    const { tires } = this.state;
    tires.profile = type;
    this.updateSate({ tires });
  }

  onTireWidthClick(e) {
    const type = e.target.value;
    const { tires } = this.state;
    tires.profileWidth = type;
    this.updateSate({ tires });
  }

  onTireTypeClick(e) {
    const type = e.target.value;
    const { tires } = this.state;
    tires.type = type;
    this.updateSate({ tires });
  }

  onWheelDiameterClick(e) {
    const diameter = e.target.value;
    const { wheels } = this.state;
    wheels.diameter = diameter;
    this.updateSate({ wheels });
  }
  onTireDiameterClick(e) {
    const diameter = e.target.value;
    const { tires } = this.state;
    tires.diameter = diameter;
    this.updateSate({ tires });
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
    const { path, querySmart } = this.buildQueryString();
    const url = `${path}${querySmart}`;
    const { onModalSubmit } = this.props;
    localStorage.setItem('partsSearch', JSON.stringify(this.state));

    if (onModalSubmit) {
      onModalSubmit(url);
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
      condition,
      automobiles,
      tires,
      wheels,
    } = this.state;

    let query = `?city=${city}&category=${category}`;
    let querySmart = `?city=${city}`;
    const path = `/spare-parts/${category}/`;

    if (priceFrom) {
      query += `&price_from=${priceFrom}`;
      querySmart += `&price_from=${priceFrom}`;
    }

    if (priceTo) {
      query += `&price_to=${priceTo}`;
      querySmart += `&price_to=${priceTo}`;
    }

    if (condition && condition !== 'all') {
      query += `&condition=${condition}`;
      querySmart += `&condition=${condition}`;
    }

    if (category === 'sale_spare') {
      if (automobiles.brand && automobiles.brand !== 'all') {
        query += `&brand=${automobiles.brand}`;
        querySmart += `&brand=${automobiles.brand}`;
      }
      if (automobiles.model && automobiles.model !== 'all') {
        query += `&model=${automobiles.model}`;
        querySmart += `&model=${automobiles.model}`;
      }
    }

    if (category === 'tire') {
      if (tires.type) {
        query += `&tire-type=${tires.type}`;
        querySmart += `&tire-type=${tires.type}`;
      }
      if (tires.profileWidth) {
        query += `&tire-width=${tires.profileWidth}`;
        querySmart += `&tire-width=${tires.profileWidth}`;
      }
      if (tires.profile) {
        query += `&tire-profile=${tires.profile}`;
        querySmart += `&tire-profile=${tires.profile}`;
      }
      if (wheels.diameter) {
        query += `&tire-diameter=${wheels.diameter}`;
        querySmart += `&tire-diameter=${wheels.diameter}`;
      }
    }

    if (category === 'wheels') {
      if (wheels.type) {
        query += `&wheels-type=${wheels.type}`;
        querySmart += `&wheels-type=${wheels.type}`;
      }
      if (wheels.diameter) {
        query += `&wheels-diameter=${wheels.diameter}`;
        querySmart += `&wheels-diameter=${wheels.diameter}`;
      }
    }

    return {
      path,
      query,
      querySmart,
    };
  }

  fetchCount() {
    const { query } = this.buildQueryString();
    const url = `/spare-parts/count/${query}`;
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
      case 'tire':
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
        { this.renderSelectInput('Состояние', this.getSortedItems(conditions || {}), this.onConditionClick, this.state.condition) }
        { this.renderSelectInput('Марка', this.getSortedItemsByIdName(automobiles.brands || {}), this.onAutomobileBrandClick, automobiles.brand) }
        { this.renderSelectInput('Модель', this.getSortedItemsByIdName(automobiles.models || {}), this.onAutomobileModelClick, automobiles.model) }
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
        { this.renderSelectInput('Состояние', this.getSortedItems(conditions || {}), this.onConditionClick, this.state.condition) }
        { this.renderSelectInput('Тип дисков', this.getSortedItems(wheels.types || {}), this.onWheelTypeClick, wheels.type) }
        { this.renderSelectInput('Диаметр', this.getSortedItems(wheels.diameters || {}), this.onWheelDiameterClick, wheels.diameter) }
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
        { this.renderSelectInput('Состояние', this.getSortedItems(conditions || {}), this.onConditionClick, this.state.condition) }
        { this.renderSelectInput('Тип шин', this.getSortedItems(tires.types || {}), this.onTireTypeClick, tires.type) }
        { this.renderSelectInput('Профиль', this.getSortedItems(tires.profiles || {}), this.onTireProfileClick, tires.profile) }
        { this.renderSelectInput('Ширина', this.getSortedItems(tires.profileWidths || {}), this.onTireWidthClick, tires.profileWidth) }
        { this.renderSelectInput('Диаметр', this.getSortedItems(tires.diameters || {}), this.onTireDiameterClick, tires.diameter) }
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

    const renderedCities = this.renderSelectInput('Город', this.getSortedItems(cities), this.onCityChange, this.state.city);
    const renderedCategories = this.renderSelectInput('Тип запчасти', this.getSortedItems(categories), this.onCategoryChange, this.state.category);
    const renderPrices = this.renderRangeSlider('Цена', priceFrom, priceTo, 0, 10000000, 10000, this.onPriceFromChange, 'сом');

    return (
      <div className='search-form'>
        <div className='search-form__wrapper'>
          { renderedCategories }
          { this.renderCategoryControls(category) }
          { renderedCities }
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

export default SpareSearch;
