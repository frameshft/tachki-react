import companiesReducer from './companies';
import companyProfileReducer from './companyProfile';
import carsReducer from './cars';
import sparePartsReducer from './spareParts';
import listViewReducer from './listView';

export default {
  companies: companiesReducer,
  companyProfile: companyProfileReducer,
  cars: carsReducer,
  spareParts: sparePartsReducer,
  listView: listViewReducer,
};
