import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import store from '../../store';
import * as listViewType from '../../constants/listView';
import Car from './car';
import Pagination from '../shared/pagination';
import { fetchPaginatedResponse, SUCCESS_FETCH_CARS_LIST } from '../../actions/list';
import { STORE_A_POST } from '../../actions/posts';
import SortModal from '../shared/sort.modal';


class CarList extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSortModal = this.toggleSortModal.bind(this);

    const currentLocation = browserHistory.getCurrentLocation();
    const { sort } = currentLocation.query;

    this.actionTypes = {
      entities: STORE_A_POST,
      component: SUCCESS_FETCH_CARS_LIST,
    };

    this.endpoint = sort ? `/automobiles/?sort=${sort}` : '/automobiles/';

    this.state = {
      showSortModal: false,
      currentSearch: currentLocation.search,
    };
  }

  componentDidMount() {
    store.dispatch(fetchPaginatedResponse(this.actionTypes, this.endpoint, this.props.currentPage));
  }

  componentWillReceiveProps(nextState) {
    const nextSearch = nextState.routing.locationBeforeTransitions.search;

    if (nextSearch !== this.state.currentSearch) {
      const currentLocation = browserHistory.getCurrentLocation();
      const { sort } = currentLocation.query;
      this.endpoint = sort ? `/automobiles/?sort=${sort}` : '/automobiles/';
      this.setState({
        currentSearch: currentLocation.search,
      });
      store.dispatch(fetchPaginatedResponse(this.actionTypes,
        this.endpoint, this.props.currentPage));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      store.dispatch(fetchPaginatedResponse(this.actionTypes,
        this.endpoint, this.props.currentPage));
    }
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
          <button className='button__transparent'>
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
    const { showSortModal } = this.state;
    const carsRender = [];

    if (cars.list.length > 0) {
      cars.list.forEach((i) => {
        const item = entities[i];
        if (item !== undefined) {
          carsRender.push(<Car key={ item.id } car={ item } />);
        }
      });
    }

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';

    const paginationProps = {
      totalPages: cars.totalPages,
      view: 'automobiles',
      currentPage,
    };

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
        <Pagination { ...paginationProps } />
        {showSortModal &&
        <SortModal
          onClose={ this.toggleSortModal }
          endpoint={ this.endpoint }
          actionTypes={ this.actionTypes }
        />
        }
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
    currentPage,
  };
}

export default connect(mapToProps)(CarList);
