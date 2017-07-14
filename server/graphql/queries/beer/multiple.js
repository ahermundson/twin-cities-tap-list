import {
  GraphQLList
} from 'graphql'

import { beerType } from '../../types/beer'
import BeerModel from '../../../models/beer-model'

export default {
  type: new GraphQLList(beerType),
  resolve() {
    const beers = BeerModel.find()
                  .populate('brewery_name', ['brewery_name'])
                  .exec();
    if(!beers) {
      throw new Error('Error while fetching all beers.');
    }
    return beers;
  }
}
