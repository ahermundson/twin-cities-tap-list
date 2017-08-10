import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql'

import { userType } from '../../types/user'
import UserModel from '../../../models/user-model'

// TODO MAKE EXPORT FUNCTION

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
