import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({
  register: function(opts) {
    if (!opts.email && !opts.password) {
      throw new Meteor.Error("Enter Email and password");
    } 
    var response = HTTP.call('POST', "http://floating-castle-77288.herokuapp.com/api/newuser", {data: opts})
    var parsed = JSON.parse(response.content);
    return {token: parsed.token, email: opts.email};
  },
  _login: function(opts) {
    if (!opts.email && !opts.password) {
      throw new Meteor.Error("Enter Email and password");
    } 
    var response = HTTP.call('POST', "http://floating-castle-77288.herokuapp.com/api/authenticate", {data: opts})
    var parsed = JSON.parse(response.content);
    return {token: parsed.token, email: opts.email};
  },
  createConvo: function(opts) {
    if (!opts.token) {
      throw new Meteor.Error("Token Must Be provided");
    }
    var response = HTTP.call('POST', "http://floating-castle-77288.herokuapp.com/api/convo", {data: opts});
    var parsed = JSON.parse(response.content);
    return parsed;
  }
})