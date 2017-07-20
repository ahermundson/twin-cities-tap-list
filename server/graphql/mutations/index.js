import beerMutation from './beer'
import tapListMutation from './tap_list'

export default {
  ...beerMutation,
  ...tapListMutation
}
