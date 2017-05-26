import React from 'react';
import { browserHistory } from 'react-router';
import { Range } from 'rc-slider';
import API from '../../api';
import { listToMap } from '../../utils';
import Spinner from '../shared/spinner';

class CarSearch extends React.Component {
  constructor(props) {
    super(props);

    this.onAutoBrandChange = this.onAutoBrandChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onAutoModelChange = this.onAutoModelChange.bind(this);
    this.onPriceFromChange = this.onPriceFromChange.bind(this);
    this.onIsExchangeableClick = this.onIsExchangeableClick.bind(this);
    this.onHasImagesClick = this.onHasImagesClick.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.onYear2Change = this.onYear2Change.bind(this);
    this.onMileageChange = this.onMileageChange.bind(this);
    this.onGenerationChange = this.onGenerationChange.bind(this);
    this.onConditionChange = this.onConditionChange.bind(this);
    this.onBodyTypeChange = this.onBodyTypeChange.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.onDriveUnitChange = this.onDriveUnitChange.bind(this);
    this.onTransmissionChange = this.onTransmissionChange.bind(this);
    this.onWheelChange = this.onWheelChange.bind(this);
    this.onFuelChange = this.onFuelChange.bind(this);
    this.onVolumeChange = this.onVolumeChange.bind(this);

    this.state = {
      total: 0,
      category: 'light-old',
      city: 'all',
      cities: {},
      categories: [
        { key: 'light-old', value: 'Легковые с пробегом' },
        { key: 'all', value: 'Все' },
        { key: 'light-new', value: 'Легковые новые' },
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
      condition: 'all',
      volumeFrom: 0,
      volumeTo: 10,
      autoBrandIsLoading: true,
      autoIsLoading: true,
    };
  }

  componentDidMount() {
    const { category } = this.state;
    const localStorageState = JSON.parse(localStorage.getItem('autoSearch'));
    if (localStorageState) {
      this.timout = setTimeout(() => this.setState({ ...localStorageState, autoIsLoading: false, autoBrandIsLoading: false }), 0);
    } else {
      API.fetch('/automobiles/search_init/')
        .then((res) => {
          const { cities, automobiles } = res;
          this.setState({ cities: listToMap(cities, 'key'), automobiles, autoIsLoading: false });
        })
      ;
      this.fetchCategoryAPI(category);

      this.fetchCount();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onAutoBrandChange(e) {
    const brandId = e.target.value;
    const { automobiles } = this.state;
    const { models, generations } = this.initAutomobileFilters();
    automobiles.model = null;
    automobiles.generation = null;
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
    let {
      condition,
      hasImages,
      isExchangeable,
      city,
      priceFrom,
      priceTo,
      mileageFrom,
      mileageTo,
      volumeFrom,
      volumeTo,
    } = this.state;

    automobiles.brand = null;
    automobiles.model = null;
    automobiles.generation = null;
    automobiles.bodyType = null;
    automobiles.color = null;
    automobiles.driveUnit = null;
    automobiles.transmission = null;
    automobiles.steeringWheel = null;
    automobiles.fuelType = null;
    condition = null;
    city = 'all';
    priceFrom = null;
    priceTo = null;
    mileageFrom = null;
    mileageTo = null;
    volumeTo = null;
    volumeFrom = null;
    hasImages = false;
    isExchangeable = false;

    switch (category) {
      case 'light-old':
      case 'light-new':
        priceFrom = 0;
        priceTo = 10000000;
        mileageFrom = 0;
        mileageTo = 1000000;
        volumeFrom = 0;
        volumeTo = 10;
        break;
      default:
        break;
    }

    this.fetchCategoryAPI(category);
    this.updateSate({
      condition,
      city,
      hasImages,
      isExchangeable,
      category,
      automobiles,
      priceFrom,
      priceTo,
      mileageFrom,
      mileageTo,
      volumeFrom,
      volumeTo,
    });
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
    automobiles.generation = null;

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

    this.updateSate({ yearCurrentFrom, yearCurrentTo });
  }

  onYear2Change(e) {
    const yearCurrentFrom = e[0];
    const yearCurrentTo = e[1];

    this.updateSate({ yearCurrentFrom, yearCurrentTo });
  }

  onGenerationChange(e) {
    const { automobiles } = this.state;
    automobiles.generation = e.target.value;
    this.updateSate({ automobiles });
  }

  onMileageChange(e) {
    const mileageFrom = e[0];
    const mileageTo = e[1];
    this.updateSate({ mileageFrom, mileageTo });
  }

  onPriceFromChange(e) {
    this.updateSate({
      priceFrom: e[0],
      priceTo: e[1],
    });
  }

  onHasImagesClick() {
    const { hasImages } = this.state;
    this.updateSate({ hasImages: !hasImages });
  }

  onIsExchangeableClick() {
    const { isExchangeable } = this.state;
    this.updateSate({ isExchangeable: !isExchangeable });
  }

  onConditionChange(e) {
    const condition = e.target.value;
    this.updateSate({ condition });
  }

  onBodyTypeChange(e) {
    const { automobiles } = this.state;
    automobiles.bodyType = e.target.value;

    this.updateSate({ automobiles });
  }

  onColorChange(e) {
    const { automobiles } = this.state;
    automobiles.color = e.target.value;

    this.updateSate({ automobiles });
  }

  onDriveUnitChange(e) {
    const { automobiles } = this.state;
    automobiles.driveUnit = e.target.value;

    this.updateSate({ automobiles });
  }

  onTransmissionChange(e) {
    const { automobiles } = this.state;
    automobiles.transmission = e.target.value;

    this.updateSate({ automobiles });
  }

  onWheelChange(e) {
    const { automobiles } = this.state;
    automobiles.steeringWheel = e.target.value;

    this.updateSate({ automobiles });
  }

  onFuelChange(e) {
    const { automobiles } = this.state;
    automobiles.fuelType = e.target.value;

    this.updateSate({ automobiles });
  }

  onVolumeChange(e) {
    this.updateSate({
      volumeFrom: e[0],
      volumeTo: e[1],
    });
  }

  onSearch() {
    const { path, querySmart } = this.buildQueryString();
    const url = `${path}${querySmart}`;
    const { onModalSubmit } = this.props;
    localStorage.setItem('autoSearch', JSON.stringify(this.state));

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

  fetchGeneration(yearCurrentFrom, yearCurrentTo) {
    const { automobiles } = this.state;
    const url = `/automobiles/${automobiles.model}/generations/?year-from=${yearCurrentFrom}&year-to=${yearCurrentTo}`;
    automobiles.generations = null;

    API.fetch(url)
      .then((res) => {
        if (res.length > 0) {
          automobiles.generations = [
            ...[{ id: 'all', name: 'Все' }],
            ...res,
          ];
          this.setState({ automobiles });
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

        this.setState({ automobiles, autoBrandIsLoading: false });

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
      yearCurrentFrom,
      yearCurrentTo,
      mileageFrom,
      mileageTo,
      condition,
      volumeFrom,
      volumeTo,
    } = this.state;

    let query = `?city=${city}&category=${category}`;
    let querySmart = `?city=${city}`;
    let path = `/automobiles/${category}/`;

    if (priceFrom) {
      query += `&price_from=${priceFrom}`;
      querySmart += `&price_from=${priceFrom}`;
    }

    if (priceTo) {
      query += `&price_to=${priceTo}`;
      querySmart += `&price_to=${priceTo}`;
    }

    if (isExchangeable) {
      query += '&is_exchangeable';
      querySmart += '&is_exchangeable';
    }

    if (hasImages) {
      query += '&has_images';
      querySmart += '&has_images';
    }

    if (automobiles.brand) {
      query += `&brand=${automobiles.brand}`;
      path += `${automobiles.brand}/`;
    }

    if (automobiles.model) {
      query += `&model=${automobiles.model}`;
      path += `${automobiles.model}`;
    }

    if (yearCurrentFrom) {
      query += `&year-from=${yearCurrentFrom}`;
      querySmart += `&year-from=${yearCurrentFrom}`;
    }

    if (yearCurrentTo) {
      query += `&year-to=${yearCurrentTo}`;
      querySmart += `&year-to=${yearCurrentTo}`;
    }

    if (mileageFrom) {
      query += `&mileage-from=${mileageFrom}`;
      querySmart += `&mileage-from=${mileageFrom}`;
    }

    if (mileageTo) {
      query += `&mileage-to=${mileageTo}`;
      querySmart += `&mileage-to=${mileageTo}`;
    }

    if (automobiles.generation) {
      query += `&generation=${automobiles.generation}`;
      querySmart += `&generation=${automobiles.generation}`;
    }

    if (condition) {
      query += `&condition=${condition}`;
      querySmart += `&condition=${condition}`;
    }

    if (automobiles.bodyType) {
      query += `&body-type=${automobiles.bodyType}`;
      querySmart += `&body-type=${automobiles.bodyType}`;
    }

    if (automobiles.color) {
      query += `&color=${automobiles.color}`;
      querySmart += `&color=${automobiles.color}`;
    }

    if (automobiles.driveUnit) {
      query += `&drive-unit=${automobiles.driveUnit}`;
      querySmart += `&drive-unit=${automobiles.driveUnit}`;
    }

    if (automobiles.transmission) {
      query += `&transmission=${automobiles.transmission}`;
      querySmart += `&transmission=${automobiles.transmission}`;
    }

    if (automobiles.steeringWheel) {
      query += `&steering-wheel=${automobiles.steeringWheel}`;
      querySmart += `&steering-wheel=${automobiles.steeringWheel}`;
    }

    if (automobiles.fuelType) {
      query += `&fuel-type=${automobiles.fuelType}`;
      querySmart += `&fuel-type=${automobiles.fuelType}`;
    }

    if (volumeFrom) {
      query += `&volume-from=${volumeFrom}`;
      querySmart += `&volume-from=${volumeFrom}`;
    }

    if (volumeTo) {
      query += `&volume-to=${volumeTo}`;
      querySmart += `&volume-to=${volumeTo}`;
    }

    return {
      path,
      query,
      querySmart,
    };
  }

  fetchCount() {
    const { query } = this.buildQueryString();

    const url = `/automobiles/count/${query}`;
    API.fetch(url).then(total => this.setState({ total }));
  }

  renderAutomobileBrands(category, brands, selectedBrand = undefined) {
    const isNull = !(brands && (category === 'light-new' || category === 'light-old'));

    if (isNull) return null;

    return (
      <div className='search-form__row'>
        <div className='search-form__label'>
          Марка
        </div>
        <div className='custom-select'>
          <select
            onChange={ this.onAutoBrandChange }
            className='search-form__control search-form__control--select'
            value={ selectedBrand || '' }
          >
            { brands.map(x => <option key={ x.id } value={ x.id }>{ x.name }</option>) }
          </select>
          <i className='fa fa-caret-down' />
        </div>
      </div>
    );
  }

  renderAutomobileModels(models, selectedModel = 'undefined') {
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
            value={ selectedModel || undefined }
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

  renderAutomobileGenerations(generations, selectedGeneration = undefined) {
    if (!generations) return null;

    return (
      <div className='search-form__row'>
        <div className='search-form__label'>
          Поколение
        </div>
        <div className='custom-select'>
          <select
            onChange={ this.onGenerationChange }
            className='search-form__control search-form__control--select'
            value={ selectedGeneration || undefined }
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
      <Range min={ from } max={ to } tipFormatter={ value => `${value}%` } onChange={ this.onMileageChange } value={ [mileageFrom, mileageTo] } />
    </div>);
  }

  renderAutoConditions(conditions, selectedCondition = undefined) {
    const ops = this.getSortedItems(conditions || {});

    return (
      <div className='search-form__row'>
        <div className='search-form__label'>
          Состояние
        </div>
        <div className='custom-select'>
          <select
            className='search-form__control search-form__control--select'
            onChange={ this.onConditionChange }
            value={ selectedCondition || undefined }
          >
            { ops }
          </select>
          <i className='fa fa-caret-down' />
        </div>
      </div>
    );
  }

  renderTextInput(label, handler) {
    return (
      <div className='search-form__row'>
        <div className='search-form__label'>
          { label }
        </div>
        <input
          type='text'
          className='search-form__control search-form__control--input' placeholder='Введите'
          onChange={ handler }
        />
      </div>
    );
  }

  renderSelectInput(label, options, handler, selectedOption = undefined) {
    return (
      <div className='search-form__row'>
        <div className='search-form__label'>{ label }</div>
        <div className='custom-select'>
          <select
            className='search-form__control search-form__control--select' onChange={ handler }
            value={ selectedOption || undefined }
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

  renderLightOld() {
    const {
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
      volumeFrom,
      volumeTo,
      condition,
    } = this.state;

    return (
      <div>
        { this.renderAutomobileBrands(category, automobiles.brands, automobiles.brand) }
        { this.renderAutomobileModels(automobiles.models, automobiles.model) }
        { this.renderAutomobileGenerations(automobiles.generations, automobiles.generation) }
        { this.renderAutoConditions(automobiles.conditions, condition) }
        { this.renderedMileage(0, 1000000) }
        { this.renderedYear(yearFrom, yearTo, yearCurrentFrom, yearCurrentTo) }
        { this.renderRangeSlider('Цена', priceFrom, priceTo, 0, 10000000, 10000, this.onPriceFromChange, 'сом') }
        { this.renderToggler('Только с фото', 'photo-checkbox', hasImages, this.onHasImagesClick) }
        { this.renderToggler('Только обмен', 'exchange-checkbox', isExchangeable, this.onIsExchangeableClick) }
        { this.renderSelectInput('Тип кузова', this.getSortedItems(automobiles.bodyTypes || {}), this.onBodyTypeChange, automobiles.bodyType) }
        { this.renderSelectInput('Цвет', this.getSortedItems(automobiles.colors || {}), this.onColorChange, automobiles.color) }
        { this.renderSelectInput('Привод', this.getSortedItems(automobiles.driveUnits || {}), this.onDriveUnitChange, automobiles.driveUnit) }
        { this.renderSelectInput('КПП', this.getSortedItems(automobiles.transmissions || {}), this.onTransmissionChangem, automobiles.transmission) }
        { this.renderSelectInput('Руль', this.getSortedItems(automobiles.steeringWheels || {}), this.onWheelChange, automobiles.steeringWheel) }
        { this.renderSelectInput('Тип двигателя', this.getSortedItems(automobiles.fuelTypes || {}), this.onFuelChange, automobiles.fuelType) }
        { this.renderRangeSlider('Объем', volumeFrom, volumeTo, 0, 10, 0.1, this.onVolumeChange) }
      </div>
    );
  }

  renderLightNew() {
    const {
      hasImages,
      isExchangeable,
      automobiles,
      category,
      priceFrom,
      priceTo,
      volumeFrom,
      volumeTo,
    } = this.state;

    return (
      <div>
        { this.renderAutomobileBrands(category, automobiles.brands, automobiles.brand) }
        { this.renderAutomobileModels(automobiles.models, automobiles.model) }
        { this.renderAutomobileGenerations(automobiles.generations, automobiles.generation) }
        { this.renderRangeSlider('Цена', priceFrom, priceTo, 0, 10000000, 10000, this.onPriceFromChange, 'сом') }
        { this.renderToggler('Только с фото', 'photo-checkbox', hasImages, this.onHasImagesClick) }
        { this.renderToggler('Только обмен', 'exchange-checkbox', isExchangeable, this.onIsExchangeableClick) }
        { this.renderSelectInput('Тип кузова', this.getSortedItems(automobiles.bodyTypes || {}), this.onBodyTypeChange, automobiles.bodyType) }
        { this.renderSelectInput('Цвет', this.getSortedItems(automobiles.colors || {}), this.onColorChange, automobiles.color) }
        { this.renderSelectInput('Привод', this.getSortedItems(automobiles.driveUnits || {}), this.onDriveUnitChange, automobiles.driveUnit) }
        { this.renderSelectInput('КПП', this.getSortedItems(automobiles.transmissions || {}), this.onTransmissionChange, automobiles.transmission) }
        { this.renderSelectInput('Руль', this.getSortedItems(automobiles.steeringWheels || {}), this.onWheelChange, automobiles.steeringWheel) }
        { this.renderSelectInput('Тип двигателя', this.getSortedItems(automobiles.fuelTypes || {}), this.onFuelChange, automobiles.fuelType) }
        { this.renderRangeSlider('Объем', volumeFrom, volumeTo, 0, 10, 0.1, this.onVolumeChange) }
      </div>
    );
  }

  renderCategoryWidgets(category) {
    switch (category) {
      case 'light-new':
        return this.renderLightNew();
      case 'light-old':
        return this.renderLightOld();
      default:
        return null;
    }
  }

  render() {
    const {
      cities,
      category,
      categories,
      total,
      autoIsLoading,
      autoBrandIsLoading,
    } = this.state;

    const renderedCities = this.renderSelectInput('Город', this.getSortedItems(cities), this.onCityChange, this.state.city);
    const renderedCategories = this.renderSelectInput('Тип транспорта', this.getSortedItems(categories), this.onCategoryChange, this.state.category);
    const isLoading = autoIsLoading || autoBrandIsLoading;

    return (isLoading) ? <Spinner /> : (
      <div className='search-form'>
        <div className='search-form__wrapper'>
          { renderedCategories }
          { this.renderCategoryWidgets(category) }
          { renderedCities }

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
