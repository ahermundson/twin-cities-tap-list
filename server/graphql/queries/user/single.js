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

    switch(decoded.identities[0].provider) {
      case 'google-oauth2':
        return UserModel.findOne({email: decoded.email}).exec();
      break;
      case 'facebook':
        return UserModel.findOne({facebook_userid: decoded.identities[0].user_id});
      break;
      case 'twitter':
        return UserModel.findOne({twitter_userid: decoded.identities[0].user_id});
      break;
    }
  }
}
