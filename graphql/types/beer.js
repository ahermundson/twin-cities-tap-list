import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql'

import BeerModel from '../../models/beer-model'
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
      type: GraphQLID
    }
  })
});
