import Auth0Lock from 'auth0-lock'

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
      // this.getProfile = this.getProfile.bind(this);
      this.lock.on('authenticated', (authResult) => {
        this.lock.hide();
        this.setSession(authResult);
        this.lock.getUserInfo(authResult.accessToken, (err, profile) => {
          console.log(profile);
        });
      })
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
      // navigate to the home route
      history.replace('/home');
    }

    isAuthenticated() {
      // Check whether the current time is past the
      // access token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    // getProfile(cb) {
    //   let accessToken = localStorage.access_token;
    //   this.lock.client.userInfo(accessToken, (err, profile) => {
    //     if (profile) {
    //       console.log("PROFILE: ", profile);
    //       this.userProfile = profile;
    //     }
    //     cb(err, profile);
    //   });
    // }

}
