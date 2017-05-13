import authReducer from './auth';
// import viewedPostsReducer from './posts.viewed';
import pageLocation from './pageLocation';

import entities from './entities';
import views from './views';

export default {
  auth: authReducer,
  // viewedPosts: viewedPostsReducer,
  pageLocation,
  entities,
  views,
};
