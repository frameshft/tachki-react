import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import * as listViewType from '../../constants/listView';
import Service from './service';
import Pagination from '../shared/pagination';
import { fetchPaginatedResponse, SUCCESS_FETCH_SERVICES_LIST } from '../../actions/list';
import { STORE_A_POST } from '../../actions/posts';

class ServicesList extends React.Component {
  componentDidMount() {
    store.dispatch(fetchPaginatedResponse({
      entities: STORE_A_POST,
      component: SUCCESS_FETCH_SERVICES_LIST,
    }, '/services', this.props.currentPage));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      store.dispatch(fetchPaginatedResponse({
        entities: STORE_A_POST,
        component: SUCCESS_FETCH_SERVICES_LIST,
      }, '/services', this.props.currentPage));
    }
  }

  render() {
    const { listView, services, currentPage, entities } = this.props;
    const carsRender = [];

    if (services.list.length > 0) {
      services.list.forEach((i) => {
        const item = entities[i];
        if (item !== undefined) {
          carsRender.push(<Service key={ item.id } service={ item } />);
        }
      });
    }

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';

    const paginationProps = {
      totalPages: services.totalPages,
      view: 'services',
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

ServicesList.PropTypes = {
  listView: React.PropTypes.number.isRequired,
  services: React.PropTypes.object.isRequired,
  currentPage: React.PropTypes.number.isRequired,
};


function mapToProps(state) {
  let currentPage = state.routing.locationBeforeTransitions.query.page;
  currentPage = currentPage !== undefined ? +currentPage : 1;

  return {
    entities: state.entities.posts,
    services: state.views.services,
    listView: state.views.listView,
    currentPage,
  };
}

export default connect(mapToProps)(ServicesList);