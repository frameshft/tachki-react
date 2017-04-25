import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import store from '../../store';
import * as listViewType from '../../constants/listView';
import PostItem from '../shared/post.item';
import Pagination from '../shared/pagination';
import { fetchPaginatedResponse, SUCCESS_FETCH_CARS_LIST, SUCCESS_SPARE_PARTS_LIST, SUCCESS_FETCH_SERVICES_LIST } from '../../actions/list';
import { fetchPostsCount, STORE_A_POST } from '../../actions/posts';
import SortModal from '../shared/sort.modal';
import Search from '../cars/car.search';


class PostList extends React.Component {
  constructor(props) {
    const { postType } = props;

    super(props);

    this.toggleSortModal = this.toggleSortModal.bind(this);
    this.onSearchClickModal = this.onSearchClickModal.bind(this);
    this.onCloseSearchModal = this.onCloseSearchModal.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);
    const currentLocation = browserHistory.getCurrentLocation();

    this.state = {
      showSortModal: false,
      currentSearch: currentLocation.search,
      showSearchModal: false,
    };

    this.actionTypes = { entities: STORE_A_POST };

    switch (postType) {
      case 'automobiles':
        this.endPoint = '/automobiles/';
        this.viewClassName = 'cars';
        this.viewTitle = 'Автомобили';
        this.actionTypes.component = SUCCESS_FETCH_CARS_LIST;
        this.allPostsLinks = '/cars';
        break;
      case 'spareParts':
        this.endPoint = '/spare-parts/';
        this.viewClassName = 'companies';
        this.viewTitle = 'Запчасти';
        this.actionTypes.component = SUCCESS_SPARE_PARTS_LIST;
        this.allPostsLinks = '/spare-parts';
        break;
      case 'services':
        this.endPoint = '/services/';
        this.viewClassName = 'companies';
        this.viewTitle = 'Услуги';
        this.actionTypes.component = SUCCESS_FETCH_SERVICES_LIST;
        this.allPostsLinks = '/services';
        break;
      case 'cargos':
        this.endPoint = '/cargo/';
        this.viewClassName = 'companies';
        this.viewTitle = 'Грузовые';
        this.actionTypes.component = SUCCESS_FETCH_SERVICES_LIST;
        this.allPostsLinks = '/cargo';
        break;
      default:
        break;

    }

    this.buildEndPoint();
  }

  componentDidMount() {
    this.fetchData(browserHistory.getCurrentLocation().search);
  }

  componentWillReceiveProps(nextProps) {
    const urlSearch = browserHistory.getCurrentLocation().search;
    if (urlSearch !== nextProps.url.search) {
      this.fetchData(urlSearch, nextProps.url.search);
    }
  }

  onSearchClickModal() {
    this.setState({
      showSearchModal: true,
    });
  }

  onCloseSearchModal() {
    this.setState({
      showSearchModal: false,
    });
  }

  onModalSubmit(query) {
    this.setState({
      showSearchModal: false,
    }, () => {
      browserHistory.push(`${this.endPoint}${query}`);
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

  fetchData(urlSearch, nextUrlSearch = null) {
    store.dispatch(this.fetchPosts(urlSearch));
    store.dispatch(fetchPostsCount(nextUrlSearch || urlSearch));
  }

  fetchPosts(urlSearch, query = null) {
    const endpoint = `${this.endPoint}${query !== null ? query : urlSearch}`;
    return fetchPaginatedResponse(this.actionTypes, endpoint, this.props.currentPage);
  }

  buildEndPoint() {
    const loc = browserHistory.getCurrentLocation();

    if (loc.search.length > 0) {
      return `${this.endPoint}?${loc.search}`;
    }

    return this.endPoint;
  }

  toggleSortModal() {
    this.setState({
      showSortModal: !this.state.showSortModal,
    });
  }

  renderFrontpage() {
    const { isFrontPage } = this.props;

    return isFrontPage ?
      <Link to={ this.allPostsLinks } className='frontpage__block__all-links'>
        Все объявления
        <i className='fa fa-arrow-right' />
      </Link> :
      <ul className='head-tools'>
        <li className='head-tools__item head-tools__item--search'>
          <button className='button__transparent' onClick={ this.onSearchClickModal }>Поиск</button>
        </li>
        <li className='head-tools__item head-tools__item--sort'>
          <button className='button__transparent' onClick={ this.toggleSortModal }>Сортировка</button>
        </li>
        <li className='head-tools__item head-tools__item--marker'>
          <button className='button__transparent'>Показать на карте</button>
        </li>
      </ul>;
  }

  render() {
    const { listView, posts, currentPage, isFrontPage, totalPages, totalPosts, postType } = this.props;
    const { showSortModal, showSearchModal } = this.state;
    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';
    const endpoint = this.buildEndPoint();

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

    return (
      <div className={ `body ${this.viewClassName}` }>
        <div className='frontpage__block__head desktop'>
          <h3 className='frontpage__block__title'>{ this.viewTitle }</h3>
          { this.renderFrontpage() }
        </div>
        { !isFrontPage && <button className='mobile-search' onClick={ this.onSearchClickModal } />}

        <div className={ `list${listsCls}` }>
          { posts.map(x => <PostItem key={ x.id } post={ x } endpoint={ this.endPoint } />) }
        </div>

        <div className='body-bottom'>
          <h3 className='total-item-num'>Показано объявлений { itemsCount } из { totalItemsCount }</h3>
          <Pagination { ...paginationProps } />
        </div>

        {showSortModal &&
        <SortModal
          onClose={ this.toggleSortModal }
          endpoint={ endpoint }
          actionTypes={ this.actionTypes }
        />
        }
        {showSearchModal && <div>
          <div className='modal fade in'>
            <div className='modal-dialog modal-dialog--search'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <button
                    className='button__transparent modal-close'
                    onClick={ this.onCloseSearchModal }
                    title='Закрыть окно'
                  >
                    <i className='fa fa-times' />
                  </button>
                </div>
                <div className='modal-body'>
                  <Search onModalSubmit={ this.onModalSubmit } />
                </div>
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
  const postType = props.route.postType;
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
