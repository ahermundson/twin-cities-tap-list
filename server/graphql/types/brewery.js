import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql'

import BreweryModel from '../../models/brewery'

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
