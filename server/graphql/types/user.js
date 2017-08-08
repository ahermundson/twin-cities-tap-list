import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql'

import UserModel from '../../models/user-model'
import {beerType} from './beer'
import {breweryType} from './brewery'
import {barType} from './bar'

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
    favorite_beers: {
      type: new GraphQLList(beerType)
    },
    favorite_bars: {
      type: new GraphQLList(barType)
    },
    favorite_breweries: {
      type: new GraphQLList(breweryType)
    }
  })
});
