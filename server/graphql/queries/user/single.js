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
  args: {},

  resolve(root, params, context) {
    jwt.verify(context.headers.authorization, new Buffer(process.env.AUTH_SECRET), { algorithms: ['HS256'] }, function(err, decoded) {
      if (err) {
        console.log("Error: ", err);
      } else {
        console.log('DECODED: ', decoded );
        switch(decoded.identities.provider) {
          case 'google-oauth2': return UserModel.findOne({email: decoded.email});
          break;
          case 'facebook': return UserModel.findOne({facebook_userid: decoded.identities.user_id});
          break;
          case 'twitter': return UserModel.findOne({twitter_userid: decoded.identities.user_id});
        }
      }
    });
  }
}
