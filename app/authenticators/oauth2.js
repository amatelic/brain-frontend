// app/authenticators/oauth2.js
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'brain/config/environment';

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: ENV.backend.url + '/token',
  // serverTokenRevocationEndpoint: 'http://brain.app/api/token/revoke'
});
