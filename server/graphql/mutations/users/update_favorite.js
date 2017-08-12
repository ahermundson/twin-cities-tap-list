import jwt from 'jsonwebtoken'

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql'

import { userType, userFavoriteListInputType } from '../../types/user'
import UserModel from '../../../models/user-model'

export default {
  type: userType,
  args: {
    data: {
      name: 'bar_id',
      type: new GraphQLNonNull(userFavoriteListInputType)
    }
  },
  resolve(root, params, context) {

    const decoded = jwt.verify(context.headers.authorization, new Buffer(process.env.AUTH_SECRET), { algorithms: ['HS256'] });

    if (!decoded) {
      return 'No user found.';
    }
    let userFavorite = UserModel.findOneAndUpdate({"user_id": decoded.identities[0].user_id},
      { $push: {"favorite_bars": params.data.bar_id } }
    )
    if (!userFavorite) {
      console.log("Error updating users favorite")
    }
    else {
      return userFavorite;
    }
  }
}
