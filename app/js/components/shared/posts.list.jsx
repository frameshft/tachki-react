import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import store from '../../store';
import * as listViewType from '../../constants/listView';
import PostItem from '../shared/post.item';
import Pagination from '../shared/pagination';
import {
  fetchPaginatedResponse, SUCCESS_FETCH_CARS_LIST, SUCCESS_SPARE_PARTS_LIST, SUCCESS_FETCH_SERVICES_LIST,
  SUCCESS_FETCH_CARGO_LIST, SUCCESS_FETCH_COMPANIES_LIST,
} from '../../actions/list';
import {
  FETCH_CARGO_COUNT, FETCH_CARS_COUNT, FETCH_SERVICES_COUNT, FETCH_SPAREPTS_COUNT, fetchPostCount,
  STORE_A_POST,
} from '../../actions/posts';
import SortModal from '../shared/sort.modal';
import CarSearch from '../cars/car.search';
import ServicesSearch from '../services/services.search';
import SpareSearch from '../spare-parts/spare.search';
import CompanySearch from '../companies/companies.search';
import { FETCH_COUNT_COMPANY } from '../../actions/companies';
import Company from '../companies/company';


class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.onModalSet = this.onModalSet.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);
    this.onAlertHelpClose = this.onAlertHelpClose.bind(this);
    const currentLocation = browserHistory.getCurrentLocation();

    this.state = {
      currentSearch: currentLocation.search,
      componentData: { isFetched: false },
      showHelpAlert: true && props.postType === 'companies',
      modalWindow: null,
      posts: [],
    };

    this.actionTypes = { entities: STORE_A_POST };
  }

  componentDidMount() {
    this.changeStateComponent(this.props.postType);
  }

  componentWillReceiveProps(nextProps) {
    const urlSearch = browserHistory.getCurrentLocation().search;
    const isUpdateData = (this.props.currentPage !== nextProps.currentPage) || (this.props.url.search !== nextProps.url.search);
    if (isUpdateData) {
      this.fetchData(urlSearch, nextProps.url.search);
    }

    if (nextProps.postType !== this.props.postType) {
      this.changeStateComponent(nextProps.postType);
    }
  }

  onAlertHelpClose() {
    this.setState({
      showHelpAlert: false,
    });
  }

  onModalSet(name) {
    this.setState({
      modalWindow: name,
    });
  }

  onModalSubmit(query) {
    const { componentData } = this.state;
    this.setState({ modalWindow: null }, () => {
      browserHistory.push(`${componentData.endPoint}${query}`);
    });
  }

  getPageItemsCount(page, actualItemsLength, totalItemsCount, totalPages, maxPageSize = 12) {
    const pageItemsLength = actualItemsLength >= maxPageSize ? actualItemsLength : maxPageSize;
    const currentItems = (page * maxPageSize) - (maxPageSize - 1);
    let totalItemsOnPage = page * pageItemsLength;
    if (totalItemsCount < totalItemsOnPage) {
      totalItemsOnPage = totalItemsCount;
    }
    const itemsCount = totalPages === 1 ? actualItemsLength : `${currentItems}-${totalItemsOnPage}`;

    return {
      itemsCount,
      totalItemsCount,
    };
  }

  changeStateComponent(postType) {
    const componentData = {};

    switch (postType) {
      case 'companies':
        componentData.endPoint = '/companies/';
        componentData.viewClassName = 'companies';
        componentData.viewTitle = 'Комапнии';
        componentData.actionTypes = {
          entities: STORE_A_POST,
          component: SUCCESS_FETCH_COMPANIES_LIST,
        };
        componentData.allPostsLinks = '/companies';
        componentData.SearchModal = <CompanySearch onModalSubmit={ this.onModalSubmit } />;
        componentData.isFetched = true;
        componentData.COUNT_ACTION = FETCH_COUNT_COMPANY;
        break;
      case 'automobiles':
        componentData.endPoint = '/automobiles/';
        componentData.viewClassName = 'cars';
        componentData.viewTitle = 'Автомобили';
        componentData.actionTypes = {
          entities: STORE_A_POST,
          component: SUCCESS_FETCH_CARS_LIST,
        };
        componentData.allPostsLinks = '/cars';
        componentData.SearchModal = <CarSearch onModalSubmit={ this.onModalSubmit } />;
        componentData.isFetched = true;
        componentData.COUNT_ACTION = FETCH_CARS_COUNT;
        break;
      case 'spareParts':
        componentData.endPoint = '/spare-parts/';
        componentData.viewClassName = 'companies';
        componentData.viewTitle = 'Запчасти';
        componentData.actionTypes = {
          entities: STORE_A_POST,
          component: SUCCESS_SPARE_PARTS_LIST,
        };
        componentData.allPostsLinks = '/spare-parts';
        componentData.SearchModal = <SpareSearch onModalSubmit={ this.onModalSubmit } />;
        componentData.isFetched = true;
        componentData.COUNT_ACTION = FETCH_SPAREPTS_COUNT;
        break;
      case 'services':
        componentData.endPoint = '/services/';
        componentData.viewClassName = 'companies';
        componentData.viewTitle = 'Услуги';
        componentData.actionTypes = {
          entities: STORE_A_POST,
          component: SUCCESS_FETCH_SERVICES_LIST,
        };
        componentData.allPostsLinks = '/services';
        componentData.SearchModal = <ServicesSearch onModalSubmit={ this.onModalSubmit } />;
        componentData.isFetched = true;
        componentData.COUNT_ACTION = FETCH_SERVICES_COUNT;
        break;
      case 'cargos':
        componentData.endPoint = '/cargo/';
        componentData.viewClassName = 'companies';
        componentData.viewTitle = 'Грузовые';
        componentData.actionTypes = {
          entities: STORE_A_POST,
          component: SUCCESS_FETCH_CARGO_LIST,
        };
        componentData.allPostsLinks = '/cargo';
        componentData.isFetched = true;
        componentData.COUNT_ACTION = FETCH_CARGO_COUNT;
        break;
      default:
        break;
    }

    this.setState({ componentData }, () => this.fetchData(browserHistory.getCurrentLocation().search));
  }

  fetchData(urlSearch, nextUrlSearch = null) {
    const { componentData } = this.state;
    store.dispatch(this.fetchPosts(urlSearch));
    store.dispatch(fetchPostCount(componentData.endPoint, nextUrlSearch || urlSearch, componentData.COUNT_ACTION));
  }

  fetchPosts(urlSearch, query = null) {
    const { componentData } = this.state;
    const endpoint = `${componentData.endPoint}${query !== null ? query : urlSearch}`;
    return fetchPaginatedResponse(componentData.actionTypes, endpoint, this.props.currentPage);
  }

  buildEndPoint(endPoint) {
    const loc = browserHistory.getCurrentLocation();

    if (loc.search.length > 0) {
      return `${endPoint}?${loc.search}`;
    }

    return endPoint;
  }

  renderFrontpage() {
    const { isFrontPage, postType } = this.props;
    const { componentData } = this.state;
    const title = postType === 'companies' ? 'Все компании' : 'Все объявления';

    return isFrontPage ?
      <Link to={ componentData.allPostsLinks } className='frontpage__block__all-links'>
        { title } <i className='fa fa-arrow-right' />
      </Link> :
      <ul className='head-tools'>
        <li className='head-tools__item head-tools__item--search'>
          <button className='button__transparent' onClick={ this.onModalSet.bind(this, 'search') }>Поиск</button>
        </li>
        { postType !== 'companies' &&
          <li className='head-tools__item head-tools__item--sort'>
            <button className='button__transparent' onClick={ this.onModalSet.bind(this, 'sort') }>Сортировка</button>
          </li>
        }
        <li className='head-tools__item head-tools__item--marker'>
          <button className='button__transparent'>Показать на карте</button>
        </li>
      </ul>;
  }

  render() {
    const { listView, posts, currentPage, isFrontPage, totalPages, totalPosts, postType } = this.props;
    const { componentData, modalWindow, showHelpAlert } = this.state;

    if (!componentData.isFetched) return null;

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';
    const endpoint = this.buildEndPoint(componentData.endPoint);

    const paginationProps = {
      currentPage,
      totalPages,
      view: postType,
    };

    const { itemsCount, totalItemsCount } = this.getPageItemsCount(
      currentPage,
      posts.length,
      totalPosts,
      totalPages,
    );

    const renderedItems = postType === 'companies' ?
      posts.map(x => <Company key={ x.id } company={ x } />) :
      posts.map(x => <PostItem key={ x.id } post={ x } endpoint={ componentData.endPoint } />)
    ;

    return (
      <div className={ `body ${componentData.viewClassName}` }>
        <div className='frontpage__block__head desktop'>
          <h3 className='frontpage__block__title'>{ componentData.viewTitle }</h3>
          { this.renderFrontpage() }
        </div>

        {showHelpAlert && <div className='alert alert--red mobile'>
          Хотите стать компанией?
          <button className='alert__close button__transparent' onClick={ this.onAlertHelpClose }>
            <i className='fa fa-times' />
          </button>
        </div>}

        { !isFrontPage && <button className='mobile-search' onClick={ this.onModalSet.bind(this, 'search') } />}
        <div className={ `list${listsCls}` }>{ renderedItems }</div>

        <div className='body-bottom'>
          <h3 className='total-item-num'>
            Показано { postType === 'companies' ? 'компаний' : 'объявлений' } { itemsCount } из { totalItemsCount }
          </h3>
          <Pagination { ...paginationProps } />
        </div>

        {modalWindow === 'sort' &&
        <SortModal
          onClose={ this.onModalSet.bind(this, null) }
          endpoint={ endpoint }
          actionTypes={ componentData.actionTypes }
        />
        }
        {modalWindow === 'search' && <div>
          <div className='modal fade in'>
            <div className='modal-dialog modal-dialog--search'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <button
                    className='button__transparent modal-close'
                    onClick={ this.onModalSet.bind(this, null) }
                    title='Закрыть окно'
                  >
                    <i className='fa fa-times' />
                  </button>
                </div>
                <div className='modal-body'>{ componentData.SearchModal }</div>
              </div>
            </div>
          </div>
          <div className='modal-backdrop fade in' />
        </div>}
      </div>
    );
  }
}

PostList.PropTypes = {
  listView: React.PropTypes.number.isRequired,
  posts: React.PropTypes.object.isRequired,
  currentPage: React.PropTypes.number.isRequired,
  isFrontPage: React.PropTypes.bool,
};

PostList.defaultProps = {
  isFrontPage: false,
};


function mapToProps(state, props) {
  const postType = props.postType || props.route.postType;
  const entities = state.entities.posts;
  const viewData = state.views[postType];

  const posts = viewData.list.map(x => entities[x]).filter(x => !!x);

  let currentPage = state.routing.locationBeforeTransitions.query.page;
  currentPage = currentPage !== undefined ? +currentPage : 1;

  return {
    listView: state.views.listView,
    url: state.routing.locationBeforeTransitions,
    currentPage,
    posts,
    postType,
    totalPages: viewData.totalPages,
    totalPosts: viewData.total,
  };
}

export default connect(mapToProps)(PostList);