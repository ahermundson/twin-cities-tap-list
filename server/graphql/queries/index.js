import beerQuery from './beer';
import breweryQuery from './brewery';
import barQuery from './bar';
import userQuery from './user'

export default {
  ...beerQuery,
  ...breweryQuery,
  ...barQuery,
  ...userQuery
};
