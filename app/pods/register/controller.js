import Ember from 'ember';
import ENV from 'brain/config/environment';
import Validate from '../../utility/validation';
import Change from '../../utility/change';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  init() {
    this._super(...arguments);
    let model = { name: "", username: "", email: "", password: "", repassword: ""};
    this.changeset = new Change(model, new Validate(), {
      name: ['isEmpty'],
      username: ['isEmpty'],
      email: ['notEmail','isEmpty'],
      password: ['greater|8'],
      repassword: ['equal|password'],
    });
  },
  actions: {
    register() {
      this.get('ajax').request(ENV.backend.url + '/register', {
        method: 'POST',
        data: this.changeset.getAll()
      }).then( () => {
        this.transitionToRoute('login');
      })
      .catch(res => {
        if (res.errors[0].status === "409") {
          this.set('errors', [{
            title: 'Sorry user already exsists.',
            message: 'Try something else.',
          }]);
        }
      });
    }
  }
});
