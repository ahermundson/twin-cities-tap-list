import React, { Component } from 'react';
import '../App.css';
import Auth0Lock from 'auth0-lock'
import history from '../history'
import Home from './Home'
import Beers from './Beers'
import Bars from './Bars'
import TapListEntry from './TapListEntry'
import BarInfo from './BarInfo'
import Profile from './Profile'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {red600} from 'material-ui/styles/colors'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

injectTapEventPlugin();

const styles = {
  backgroundColor: red600,
  titleStyle: 'white'
}

const options = {
  auth: {
    responseType: 'token',
    redirect: false,
    params: {scope: 'openid email profile'}
  },
  theme: {
    primaryColor: red600,
    logo: 'http://simpleicon.com/wp-content/uploads/beer1-64x64.png'
  },
  languageDictionary: {
    title: "Twin Cities Tap List"
  }
}

const lock = new Auth0Lock(
  process.env.REACT_APP_CLIENT_ID,
  process.env.REACT_APP_AUTH_DOMAIN,
  options);

class App extends Component {

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    console.log(nextProps.getUserData.User);
  }

  componentDidMount() {

    lock.on('authenticated', (authResult) => {
      console.log(this.props);
      lock.hide();
      this.setSession(authResult);
      this.closeLeftNav();
      this.props.getUserData();
    });

    this.setState({
      isAuth: this.isAuthenticated()
    });
  }

  constructor(props){
    super(props);

    this.state = {menuOpen: false, profile: {}, isAuth: false, user: {}};
    this.handleToggle = this.handleToggle.bind(this);
    this.closeLeftNav = this.closeLeftNav.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.setSession = this.setSession.bind(this);
  }

  login() {
    lock.show();
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.setState({
      user: {},
      isAuth: false
    });
    history.replace('/');
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  handleToggle = () => {
    this.isAuthenticated();
    this.setState({menuOpen: !this.state.open})
  };

  closeLeftNav = (value) => {
    this.setState({menuOpen: false})
  };

  render() {


    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Router>
          <div className="App">
            <AppBar
              title="Twin Cities Tap List"
              style={styles}
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonTouchTap={this.handleToggle}
            />
            <Drawer
              open={this.state.menuOpen}
              onRequestChange={open => this.setState({menuOpen: open})}
              docked={false}>
              {
                this.state.isAuth ? <div><MenuItem
                  onTouchTap={this.closeLeftNav}
                  value={'/profile'}
                  primaryText="Your Profile"
                  containerElement={<Link to={`/profile/${this.state.user._id}`} />}
                />
                <Divider /></div> : null
              }
              <MenuItem
                onTouchTap={this.closeLeftNav}
                value={'/'}
                primaryText="Home"
                containerElement={<Link to='/' />}
              />
              <Divider />
              <MenuItem
                onTouchTap={this.closeLeftNav}
                value={'/beers'}
                primaryText="All Beers"
                containerElement={<Link to='/beers' />}
              />
              <Divider />
              <MenuItem
                onTouchTap={this.closeLeftNav}
                value={'/allbars'}
                primaryText="All Bars"
                containerElement={<Link to='/allbars' />}
              />
              <Divider />
                <MenuItem
                  onTouchTap={this.closeLeftNav}
                  value={'/taplistentry'}
                  primaryText="Enter A Tap List"
                  containerElement={<Link to='/taplistentry' />}
                />
              <Divider />
              {
                this.state.isAuth ? <MenuItem
                  onTouchTap={this.logout}
                  primaryText="Logout"
                /> : <MenuItem
                  onTouchTap={this.login}
                  primaryText="Login / Sign Up"
                />
              }
            </Drawer>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/beers" component={Beers} />
            <Route path="/bars/:beer_id" component={Bars} />
            <Route path="/allbars/" component={Bars} />
            <Route path="/taplistentry" component={TapListEntry} />
            <Route path="/bar/:beer_id" component={BarInfo} />
            <Route path="/profile/:user_id" component={Profile} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const UserQuery = gql`query UserQuery {
  User {
    _id
    first_name
    last_name
  }
}`;

const AppWithData = graphql(UserQuery, {
  name: 'getUserData'
})(App)

export default AppWithData;
