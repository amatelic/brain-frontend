// app/controllers/login.js
import Ember from 'ember';
import Validate from '../../utility/validation';
import Change from '../../utility/change';
let { get } = Ember;
export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  init() {
    this._super(...arguments);
    let model = { email: "", password: "" };
    this.changeset = new Change(model, new Validate(), {
      email: ['isEmpty'],
      password: ['isEmpty'],
    });
  },
  actions: {
    authenticate() {
      let email = get(this, 'changeset.email.value');
      let password = get(this, 'changeset.password.value');
      get(this, 'session').authenticate('authenticator:oauth2', email, password)
      .then(() => this.transitionTo('application'))
      .catch(res => {
        this.set('errors', res.errors);
      });
    },
  }
});
