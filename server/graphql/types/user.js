import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql'

import UserModel from '../../models/user-model'
import {beerType} from './beer'

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    first_name: {
      type: GraphQLString
    },
    last_name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    facebook_userid: {
      type: GraphQLString
    },
    twitter_userid: {
      type: GraphQLString
    },
    favorites: {
      type: new GraphQLList(beerType)
    }
  })
});
