import {
  GraphQLNonNull
} from 'graphql'

import { beerType, beerInputType } from '../../types/beer'
import BeerModel from '../../../models/beer-model'

export default {
  type: beerType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(beerInputType)
    }
  },
  resolve(root, params) {
    const bModel = new BeerModel(params.data);
    const newBeer = bModel.save();
    if(!newBeer) {
      throw new Error('Error saving new beer');
    }
    return newBeer;
  }
}
