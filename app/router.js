import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('messages');
  this.route('user');
  this.route('home');
  this.route('tasks');
  this.route('login');
  this.route('register');
  this.route('graph');
  this.route('modal.welcome');

  this.route('modal', function() {
    this.route('welcome');
  });
  this.route('calender');
  this.route('not-found', { path: '/*path' });
});

export default Router;
