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
  args: {
    email: {
      name: 'Email',
      type: new GraphQLNonNull(GraphQLString)
    }
  },

  resolve(root, params, context) {
    jwt.verify(context.headers.authorization, new Buffer(process.env.AUTH_SECRET), { algorithms: ['HS256'] }, function(err, decoded) {
      if (err) {
        console.log("Error: ", err);
      } else {
        console.log('DECODED: ', decoded );
        if (decoded.email_verified) {
          return UserModel.findOne({email: decoded.email})
        }
      }
    });
  }
}
