import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return {
      user: {
        username: 'anze matelic',
        image: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'
      }
    };
  }
});
