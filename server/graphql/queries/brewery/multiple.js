import {
  GraphQLList
} from 'graphql'

import { breweryType } from '../../types/brewery'
import BreweryModel from '../../../models/brewery-model'

export default {
  type: new GraphQLList(breweryType),
  resolve() {
    const brewery = BreweryModel.find()
                  .exec();
    if(!brewery) {
      throw new Error('Error while fetching all beers.');
    }
    return brewery;
  }
}
