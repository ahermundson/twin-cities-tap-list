import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'

import { barType } from '../../types/bar';
import BarModel from '../../../models/bar-model';

export default {
  type: new GraphQLList(barType),
  args: {
    id: {
      name: 'BeerID',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params) {
    const bars = BarModel.find({beers_on_tap: params.id}).exec();
    return bars;
  }
}
