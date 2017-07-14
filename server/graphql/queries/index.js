import beerQuery from './beer';
import breweryQuery from './brewery';
import barQuery from './bar';

export default {
  ...beerQuery,
  ...breweryQuery,
  ...barQuery
};
