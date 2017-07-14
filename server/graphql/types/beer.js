import {
  GraphQLObjectType,
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
      type: GraphQLString
    }
  })
});
