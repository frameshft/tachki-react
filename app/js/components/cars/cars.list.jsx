import React from 'react';
import {connect} from 'react-redux';
import store from  '../../store';
import API from '../../api';
import { FETCH_CARS_LIST } from "../../actions/cars";

import * as listViewType from '../../constants/listView';
import Car from './car';
import Pagination from '../shared/pagination';

class CarList extends React.Component {

  fetchAuto() {
    API.fetch('/automobiles/')
      .then(res => {
        store.dispatch({
          type: FETCH_CARS_LIST,
          data: res,
        });
      });
  }

  fetchPage(page) {
    API.fetch(`/automobiles/?page=${page}`)
      .then(res => {
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
      currentPage: 1
    };
  }

  componentDidMount() {
    this.fetchAuto();
  }

  onPageClick(page) {
    this.fetchPage(page);

    this.setState({
      currentPage: page
    });
  }

  render() {
    const {currentPage} = this.state;
    const {listView, cars} = this.props;

    const carsList = cars.get('list');

    const carsRender = [];

    if (cars.get('status') === 1) {
      carsList.map(function (item) {
        carsRender.push(<Car key={item.id} car={item}/>)
      });
    }

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? "" : " list--small";

    const paginationProps = {
      totalPages: cars.get('totalPages'),
      selectPage: this.onPageClick,
      currentPage
    };

    return (
      <div className="body companies">
        <div className={"list" + listsCls}>
          {carsRender}
        </div>
        <Pagination {...paginationProps} />
      </div>
    )
  }
}

function mapToProps(state) {
  const listView = state.listView.get('listView');
  return {
    cars: state.cars,
    listView,
  };
}

export default connect(mapToProps)(CarList);