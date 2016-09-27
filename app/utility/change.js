import Ember from 'ember';
const {get, set, isEmpty} =  Ember;
export default Ember.Object.extend({

  init() {
    this._super(...arguments);

    set(this, 'validator', arguments[1]);
    set(this, 'rules', arguments[2]);

    for (let key in arguments[0]) {
      if (arguments[0].hasOwnProperty(key)) {
        let value = arguments[0][key];
        let rule = arguments[2][key];
        set(this, key, this.inputProxy(value, rule, key));
      }
    }
  },
  /**
   * Method for registering new cheking validation property
   * @param String  input value
   * @param Object rules for input data
   * @return Object
   */
  inputProxy(input, rules, key) {

    //create new  checker property
    let properties = this.createCheckerProperty(input, []);
    properties.isValid = this.createComputedProperties(input, key);
    return properties;
  },

  getErrors(input, rules) {
    let validator = get(this, 'validator');
    return rules
        .filter(data => {
          let [rule, exp] = data.split('|'); //spliting commands
          return (validator[rule]) ? validator[rule].call(this, input, exp) : false;
        })
        .map(data => {
          let [rule, exp] = data.split('|');
          if (typeof validator.response[rule] === 'function') {
            return validator.response[rule](input, exp);
          }
          return validator.response[data.split('|')[0]];
        });
  },

  createCheckerProperty(value, errors) {
    return {
      old: value,
      value, errors,
    };
  },

  roolback(name) {
    let oldValue = get(this, `${name}.old`);
    set(this, `${name}.value`, oldValue);
    return oldValue;
  },

  createComputedProperties(input, key) {
      let rules = get(this, 'rules')[key];
      let firstValue = true;
      let debounce = null;
      return Ember.computed(`value`, function() {
        if (firstValue) {
          firstValue =!firstValue;
        } else {
          Ember.run.cancel(debounce);
          debounce = Ember.run.debounce(this, () => {
            let property = get(this, key);
            let errors = this.getErrors(property.value, rules);
            set(property, 'errors', errors);
            return isEmpty(errors) ? true : false;
          }, 1000);
        }
        return firstValue;


      }.bind(this));
  }
});
