import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import * as listViewType from '../../constants/listView';
import PostItem from '../shared/post.item';
import Pagination from '../shared/pagination';
import { fetchPaginatedResponse, SUCCESS_FETCH_CARGO_LIST } from '../../actions/list';
import { STORE_A_POST } from '../../actions/posts';

class CargoList extends React.Component {
  componentDidMount() {
    store.dispatch(fetchPaginatedResponse({
      entities: STORE_A_POST,
      component: SUCCESS_FETCH_CARGO_LIST,
    }, '/cargo', this.props.currentPage));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      store.dispatch(fetchPaginatedResponse({
        entities: STORE_A_POST,
        component: SUCCESS_FETCH_CARGO_LIST,
      }, '/cargo', this.props.currentPage));
    }
  }

  render() {
    const { listView, cargos, currentPage, entities } = this.props;
    const carsRender = [];

    if (cargos.list.length > 0) {
      cargos.list.forEach((i) => {
        const item = entities[i];
        if (item !== undefined) {
          carsRender.push(<PostItem key={ item.id } post={ item } endpoint='/cargo' />);
        }
      });
    }

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';

    const paginationProps = {
      totalPages: cargos.totalPages,
      view: 'cargos',
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

CargoList.PropTypes = {
  listView: React.PropTypes.number.isRequired,
  cargos: React.PropTypes.object.isRequired,
  currentPage: React.PropTypes.number.isRequired,
};


function mapToProps(state) {
  let currentPage = state.routing.locationBeforeTransitions.query.page;
  currentPage = currentPage !== undefined ? +currentPage : 1;

  return {
    entities: state.entities.posts,
    cargos: state.views.cargos,
    listView: state.views.listView,
    currentPage,
  };
}

export default connect(mapToProps)(CargoList);
