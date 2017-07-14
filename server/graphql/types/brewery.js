import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql'

import BreweryModel from '../../models/brewery-model'

export const breweryType = new GraphQLObjectType({
  name: 'Brewery',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    brewery_name: {
      type: GraphQLString
    }
  })
});
