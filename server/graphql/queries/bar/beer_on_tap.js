import jwt from 'jsonwebtoken'

import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'

import { barType } from '../../types/bar';
import BarModel from '../../../models/bar-model';

export default {
  type: new GraphQLList(barType),
  args: {
    id: {
      name: 'BeerID',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, context) {
    console.log('CONTEXT: ', context.headers);
    var decoded = jwt.verify(context.headers.authorization, process.env.AUTH_SECRET);
    console.log('DECODED: ', decoded )

    const bars = BarModel.find({beers_on_tap: params.id})
    .populate({
      path: 'beers_on_tap',
      populate: {
        path: 'brewery_name'
      }
    }).exec();

    return bars;
  }
}
