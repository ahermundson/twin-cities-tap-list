import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Home from '../Components/Home'
import Beers from '../Components/Beers'
import Bars from '../Components/Bars'
import App from '../Components/App'

const createRoutes = () => {
  return (
    <Route
      path='/'
      component={App}
    >
      <IndexRoute
        component={Home}
      />
      <Route
        path={'/beers'}
        component={Beers}
      />
      <Route
        path={'/bars'}
        component={Bars}
      />
    </Route>
  )
}

const Routes = createRoutes()

export default Routes
