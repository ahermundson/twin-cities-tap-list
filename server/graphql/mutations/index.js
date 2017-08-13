import beerMutation from './beer'
import tapListMutation from './tap_list'
import updateFavorite from './users'

export default {
  ...beerMutation,
  ...tapListMutation,
  ...updateFavorite
}
