import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLUnionType
} from 'graphql'

import BreweryModel from '../../models/brewery-model'
import { breweryType } from './brewery'

export const beerType = new GraphQLObjectType({
  name: 'Beer',
  description: 'Beer API',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    beer_name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    style: {
      type: GraphQLString
    },
    brewery_name: {
      type: breweryType
    }
  })
});

export const beerInputType = new GraphQLInputObjectType({
  name: 'BeerInput',
  description: 'Insert Beer',
  fields: () => ({
    beer_name: {
      type: GraphQLString
    },
    style: {
      type: GraphQLString
    },
    brewery_name: {
      type: GraphQLID
    }
  })
});
