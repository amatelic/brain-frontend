import Ember from 'ember';
import $ from 'jquery';
import ENV from 'brain/config/environment';
export default Ember.Controller.extend({
  name: '',
  username: '',
  email: '',
  password: '',
  repassword: '',
  isTypeEmail: Ember.computed.match('email', /^.+@.+\..+$/),
  isNameEmpty: Ember.computed('name', function() {
    return  !Ember.isEmpty(this.get('email'));
  }),
  isEmailEmpty: Ember.computed('isTypeEmail', 'isEmailEmpty', function() {
    return !this.get('isTypeEmail') && !(this.get('email').length < 3);
  }),
  isSamePassword: Ember.computed('repassword', function() {
    let password = this.get('password');
    let repassword = this.get('repassword');
    return (password !== repassword) && (repassword.length === password.length);
  }),
  isValid: Ember.computed('isEmpty', 'isSamePassword', function() {
    return !this.get('isSamePassword') || this.get('isTypeEmail');
  }),
  actions: {
    register() {
      // let {email, password, name} = this.getProperties('email', 'password', 'name');
      $.ajax({
        method: 'POST',
        url: ENV.backend.url + '/register',
        data: this.getProperties('email', 'password', 'name', 'username')
      }).then(d => console.log(d));
    }
  }
});
