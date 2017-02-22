import authReducer from './auth';
import companiesReducer from './companies';
import carsReducer from './cars';
import sparePartsReducer from './spareParts';
import listViewReducer from './listView';

export default {
  auth: authReducer,
  companies: companiesReducer,
  cars: carsReducer,
  spareParts: sparePartsReducer,
  listView: listViewReducer,
};
