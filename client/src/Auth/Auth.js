require('dotenv').config();
import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    clientID: process.env.REACT_APP_CLIENT_ID,
    redirectUri: 'http://localhost:3000',
    audience: process.env.REACT_APP_AUTH_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}
