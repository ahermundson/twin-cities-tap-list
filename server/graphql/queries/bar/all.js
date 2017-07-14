import {
  GraphQLList
} from 'graphql'

import { barType } from '../../types/bar'
import BarModel from '../../../models/bar-model'

export default {
  type: new GraphQLList(barType),
  resolve() {
    const bars = BarModel.find().exec();
    if(!bars) {
      throw new Error('Error while fetching all bars.');
    }
    return bars;
  }
}
