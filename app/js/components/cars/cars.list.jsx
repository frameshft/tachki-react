import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import store from '../../store';
import * as listViewType from '../../constants/listView';
import PostItem from '../shared/post.item';
import Pagination from '../shared/pagination';
import { fetchPaginatedResponse, SUCCESS_FETCH_CARS_LIST } from '../../actions/list';
import { fetchCarsCount, STORE_A_POST } from '../../actions/posts';
import SortModal from '../shared/sort.modal';
import Search from './car.search';


class CarList extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSortModal = this.toggleSortModal.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onSearchClickModal = this.onSearchClickModal.bind(this);
    this.onCloseSearchModal = this.onCloseSearchModal.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);
    const currentLocation = browserHistory.getCurrentLocation();

    this.actionTypes = {
      entities: STORE_A_POST,
      component: SUCCESS_FETCH_CARS_LIST,
    };

    this.state = {
      showSortModal: false,
      currentSearch: currentLocation.search,
      showSearchModal: false,
    };

    this.buildEndPoint();
  }

  componentDidMount() {
    const { url } = this.props;
    store.dispatch(this.fetchData());
    store.dispatch(fetchCarsCount(url.search));
  }

  componentWillReceiveProps(nextProps) {
    const { url } = this.props;

    if (url.search !== nextProps.url.search) {
      store.dispatch(this.fetchData(nextProps.url.search));
      store.dispatch(fetchCarsCount(nextProps.url.search));
    }
  }

  onSearchClick() {
    browserHistory.push('/automobiles/search');
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
      browserHistory.push(`/automobiles${query}`);
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

  fetchData(query = null) {
    const { url } = this.props;
    const endpoint = `/automobiles/${query !== null ? query : url.search}`;
    return fetchPaginatedResponse(this.actionTypes, endpoint, this.props.currentPage);
  }

  buildEndPoint() {
    const loc = browserHistory.getCurrentLocation();

    if (loc.search.length > 0) {
      return `/automobiles/?${loc.search}`;
    }
    return '/automobiles/';
  }

  toggleSortModal() {
    this.setState({
      showSortModal: !this.state.showSortModal,
    });
  }

  renderFrontpage() {
    const { isFrontPage } = this.props;

    return isFrontPage ?
      <Link to='/cars' className='frontpage__block__all-links'>
        Все объявления
        <i className='fa fa-arrow-right' />
      </Link> :
      <ul className='head-tools'>
        <li className='head-tools__item head-tools__item--search'>
          <button className='button__transparent' onClick={ this.onSearchClickModal }>
            Поиск
          </button>
        </li>
        <li className='head-tools__item head-tools__item--sort'>
          <button className='button__transparent' onClick={ this.toggleSortModal }>
            Сортировка
          </button>
        </li>
        <li className='head-tools__item head-tools__item--marker'>
          <button className='button__transparent'>
            Показать на карте
          </button>
        </li>
      </ul>;
  }

  render() {
    const { listView, cars, currentPage, entities } = this.props;
    const { showSortModal, showSearchModal } = this.state;
    const carsRender = [];

    if (cars.list.length > 0) {
      cars.list.forEach((i) => {
        const item = entities[i];
        if (item !== undefined) {
          carsRender.push(<PostItem key={ item.id } post={ item } endpoint='/automobiles' />);
        }
      });
    }

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';

    const paginationProps = {
      totalPages: cars.totalPages,
      view: 'automobiles',
      currentPage,
    };

    const { itemsCount, totalItemsCount } = this.getPageItemsCount(
      currentPage,
      carsRender.length,
      cars.total,
      cars.totalPages,
      12,
    );

    const endpoint = this.buildEndPoint();

    return (
      <div className='body cars'>
        <div className='frontpage__block__head desktop'>
          <h3 className='frontpage__block__title'>
            Автомобили
          </h3>
          { this.renderFrontpage() }
        </div>
        <div className={ `list${listsCls}` }>
          { carsRender }
        </div>
        <div className='body-bottom'>
          <h3 className='total-item-num'>
            Показано объявлений { itemsCount } из { totalItemsCount }
          </h3>
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

CarList.PropTypes = {
  listView: React.PropTypes.number.isRequired,
  cars: React.PropTypes.object.isRequired,
  currentPage: React.PropTypes.number.isRequired,
  isFrontPage: React.PropTypes.bool,
};

CarList.defaultProps = {
  isFrontPage: false,
};


function mapToProps(state) {
  let currentPage = state.routing.locationBeforeTransitions.query.page;
  currentPage = currentPage !== undefined ? +currentPage : 1;

  return {
    entities: state.entities.posts,
    cars: state.views.automobiles,
    listView: state.views.listView,
    routing: state.routing,
    url: state.routing.locationBeforeTransitions,
    currentPage,
  };
}

export default connect(mapToProps)(CarList);
