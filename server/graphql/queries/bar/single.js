import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import { barType } from '../../types/bar'
import BarModel from '../../../models/bar-model'

export default {
  type: barType,
  args: {
    id: {
      name: 'ID',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params) {
    return BarModel.findOne({_id: params.id})
    .populate({
      path: 'beers_on_tap',
      populate: {
        path: 'brewery_name'
      }
    }).exec();
  }
}
