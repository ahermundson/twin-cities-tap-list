import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql'

import { barType, tapListInputType } from '../../types/bar'
import BarModel from '../../../models/bar-model'

export default {
  type: barType,
  args: {
    data: {
      name: 'tap_list',
      type: new GraphQLNonNull(tapListInputType)
    }
  },
  resolve(root, params) {
    let tap_list = BarModel.findOneAndUpdate({"_id": params.data._id},
      { $set: {"beers_on_tap": params.data.beers_on_tap } }
    )
    if (!tap_list) {
      console.log("Likely an error updating taplist.");
    } else {
      return tap_list;
    }
  }
}
