import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
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
      type: GraphQLInt
    },
    longitude: {
      type: GraphQLInt
    },
    beers_on_tap: {
      type: new GraphQLList(beerType),
      resolve(beer) {
        const { _id } = beer;
        return BeerModel.find({beers_on_tap: _id}).exec();
      }
    },
    website: {
      type: GraphQLString
    }
  })
});
