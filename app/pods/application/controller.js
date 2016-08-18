import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  actions: {
    logout() {
      this.get('session').invalidate();
    },
    authenticate() {
      const { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:oauth2', identification, password)
      .catch(res => {
        this.set('error', res.error);
      });
    },
  }
});
