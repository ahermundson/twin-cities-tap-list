import React, { Component } from 'react';
import '../App.css';
import Auth from '../Auth/Auth'
import Home from './Home'
import Beers from './Beers'
import Bars from './Bars'
import TapListEntry from './TapListEntry'
import BarInfo from './BarInfo'
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
injectTapEventPlugin();

const styles = {
  backgroundColor: red600,
  titleStyle: 'white'
}

const auth = new Auth();

class App extends Component {

  componentDidMount() {
    let isauth = this.isAuthenticated();
    console.log(isauth);
    this.setState({
      isAuth: isauth
    });
  }

  constructor(props){
    super(props);

    this.state = {menuOpen: false, profile: {}, isAuth: false};
    this.handleToggle = this.handleToggle.bind(this);
    this.closeLeftNav = this.closeLeftNav.bind(this);
    this.login = this.login.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    auth.login();
  }

  isAuthenticated() {
    return auth.isAuthenticated();
  }

  logout() {
    auth.logout();
    this.setState({
      isAuth: false
    });
  }

  handleToggle = () => {
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
                  primaryText="Login"
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
          </div>
        </Router>

      </MuiThemeProvider>

    );
  }
}

export default App;
