import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import * as listViewType from '../../constants/listView';
import Car from './car';
import Pagination from '../shared/pagination';
import { fetchPaginatedResponse, SUCCESS_FETCH_CARS_LIST } from '../../actions/list';

class CarList extends React.Component {
  componentDidMount() {
    store.dispatch(fetchPaginatedResponse(SUCCESS_FETCH_CARS_LIST, '/automobiles', this.props.currentPage));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      store.dispatch(fetchPaginatedResponse(SUCCESS_FETCH_CARS_LIST, '/automobiles', this.props.currentPage));
    }
  }

  render() {
    const { listView, cars, currentPage } = this.props;

    const carsRender = [];

    if (cars.ordering[this.props.currentPage] !== undefined) {
      cars.ordering[this.props.currentPage].forEach((i) => {
        const item = cars.list[i];
        carsRender.push(<Car key={ item.id } car={ item } />);
      });
    }

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';

    const paginationProps = {
      totalPages: cars.totalPages,
      view: 'cars',
      currentPage,
    };

    return (
      <div className='body companies'>
        <div className={ `list${listsCls}` }>
          { carsRender }
        </div>
        <Pagination { ...paginationProps } />
      </div>
    );
  }
}

CarList.PropTypes = {
  listView: React.PropTypes.number.isRequired,
  cars: React.PropTypes.object.isRequired,
  currentPage: React.PropTypes.number.isRequired,
};


function mapToProps(state) {
  const listView = state.listView.listView;
  let currentPage = state.routing.locationBeforeTransitions.query.page;
  currentPage = currentPage !== undefined ? +currentPage : 1;

  return {
    cars: state.cars,
    listView,
    currentPage,
  };
}

export default connect(mapToProps)(CarList);
