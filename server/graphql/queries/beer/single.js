import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import { beerType } from '../../types/beer'
import BeerModel from '../../../models/beer-model'

export default {
  type: beerType,
  args: {
    id: {
      name: 'ID',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params) {
    return BeerModel.findById(params.id).exec();
  }
}
