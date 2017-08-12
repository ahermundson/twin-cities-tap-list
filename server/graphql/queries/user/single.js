var jwt = require('jsonwebtoken');

import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import { userType } from '../../types/user'
import UserModel from '../../../models/user-model'
import { beerType } from '../../types/beer'

export default {
  type: userType,

  resolve(root, params, context) {

    const decoded = jwt.verify(context.headers.authorization, new Buffer(process.env.AUTH_SECRET), { algorithms: ['HS256'] });

    if (!decoded) {
      return 'No user found.';
    }

    return UserModel.findOne({user_id: decoded.identities[0].user_id});
  }
}
