import {
  GraphQLList
} from 'graphql'

import { barType } from '../../types/bar'
import BarModel from '../../../models/bar-model'

export default {
  type: new GraphQLList(barType),
  resolve() {
    const bars = BarModel.find()
    .populate({
      path: 'beers_on_tap',
      populate: {
        path: 'brewery_name'
      }
    }).exec();
    if(!bars) {
      throw new Error('Error while fetching all bars.');
    }
    return bars;
  }
}
