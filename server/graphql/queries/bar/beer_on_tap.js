var jwt = require('jsonwebtoken');

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
    jwt.verify(context.headers.authorization, new Buffer(process.env.AUTH_SECRET), { algorithms: ['HS256'] }, function(err, decoded) {
      if (err) {
        console.log("Error: ", err);
      } else {
        console.log('DECODED: ', decoded );
      }
    });
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
