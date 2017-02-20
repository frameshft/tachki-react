import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import API from '../../api';
import { FETCH_CARS_LIST } from '../../actions/cars';

import * as listViewType from '../../constants/listView';
import Car from './car';
import Pagination from '../shared/pagination';

class CarList extends React.Component {

  static fetchAuto(page = 1) {
    API.fetch(`/automobiles/?page=${page}`)
      .then((res) => {
        store.dispatch({
          type: FETCH_CARS_LIST,
          data: res,
        });
      });
  }

  constructor(props) {
    super(props);

    this.onPageClick = this.onPageClick.bind(this);

    this.state = {
      currentPage: 1,
    };
  }

  componentDidMount() {
    CarList.fetchAuto();
  }

  onPageClick(page) {
    CarList.fetchAuto(page);

    this.setState({
      currentPage: page,
    });
  }

  render() {
    const { currentPage } = this.state;
    const { listView, cars } = this.props;

    const carsRender = [];

    if (cars.status === 1) {
      cars.ordering.forEach((i) => {
        const item = cars.list[i];
        carsRender.push(<Car key={ item.id } car={ item } />);
      });
    }

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';

    const paginationProps = {
      totalPages: cars.totalPages,
      selectPage: this.onPageClick,
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
};


function mapToProps(state) {
  const listView = state.listView.listView;
  return {
    cars: state.cars,
    listView,
  };
}

export default connect(mapToProps)(CarList);
