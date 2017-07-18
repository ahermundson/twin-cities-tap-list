import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat
} from 'graphql';

import BarModel from '../../models/bar-model';
import BeerModel from '../../models/beer-model';
import { beerType } from './beer';

export const barType = new GraphQLObjectType({
  name: 'Bar',
  description: 'Bar API',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    bar_name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    street_address: {
      type: GraphQLString
    },
    city: {
      type: GraphQLString
    },
    state: {
      type: GraphQLString
    },
    zip: {
      type: GraphQLInt
    },
    latitude: {
      type: GraphQLFloat
    },
    longitude: {
      type: GraphQLFloat
    },
    beers_on_tap: {
      type: new GraphQLList(beerType)
    },
    website: {
      type: GraphQLString
    }
  })
});
