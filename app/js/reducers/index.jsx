import authReducer from './auth';
import companiesReducer from './companies';
import carsReducer from './cars';
import sparePartsReducer from './spareParts';
import listViewReducer from './listView';
import viewedPostsReducer from './posts.viewed';

export default {
  auth: authReducer,
  companies: companiesReducer,
  cars: carsReducer,
  spareParts: sparePartsReducer,
  listView: listViewReducer,
  viewedPosts: viewedPostsReducer,
};
