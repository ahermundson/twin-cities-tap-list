import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import { breweryType } from '../../types/brewery'
import BreweryModel from '../../../models/brewery-model'

export default {
  type: breweryType,
  args: {
    id: {
      name: 'ID',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params) {
    return BreweryModel.findById(params.id).exec();
  }
}
