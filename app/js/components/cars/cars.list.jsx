import React from 'react';
import { Map } from 'immutable';
import {connect} from 'react-redux';
import store from  '../../store';
import API from '../../api';
import { FETCH_CARS_LIST } from "../../actions/cars";

import * as listViewType from '../../constants/listView';
import Car from './car';

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

  componentDidMount() {
    this.fetchAuto();
  }

  render() {
    const {listView, cars} = this.props;

    const carsList = cars.get('list');

    const carsRender = [];

    if (cars.get('status') === 1) {
      carsList.map(function (item) {
        carsRender.push(<Car key={item.id} car={item}/>)
      });
    }

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? "" : " list--small";

    return (
      <div className="body companies">
        <div className={"list" + listsCls}>
          {carsRender}
        </div>
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