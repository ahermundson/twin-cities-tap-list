import Auth0Lock from 'auth0-lock'
import history from '../history'

export default class Lock {
  lock = new Auth0Lock(
    process.env.REACT_APP_CLIENT_ID,
    process.env.REACT_APP_AUTH_DOMAIN,
    {
      auth: {
        responseType: 'token',
        redirect: false
      }
    });

    constructor() {
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.isAuthenticated = this.isAuthenticated.bind(this);
      this.lock.on('authenticated', (authResult) => {
        this.lock.hide();
        this.setSession(authResult);
        this.lock.getUserInfo(authResult.accessToken, (err, profile) => {

        });
      });
    }

    login() {
      this.lock.show();
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
      history.replace('/');
    }

    isAuthenticated() {
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

}
