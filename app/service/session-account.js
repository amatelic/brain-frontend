import Ember from 'ember';

const { inject: { service }, RSVP, Service, isEmpty } = Ember;

export default Service.extend({
  session: service('session'),
  store: service(),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      const accountId = this.get('session.data.authenticated.account_id');
      if (!isEmpty(accountId)) {
        return this.get('store').find('account', accountId).then((account) => {
          this.set('account', account);
          console.log(this)
          resolve();
        }, reject);
      } else {
        resolve();
      }
    });
  }
});
