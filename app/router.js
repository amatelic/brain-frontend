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
});

export default Router;
