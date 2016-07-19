_exposeSchemaError = function(context) {
  var invalidKeys = context.invalidKeys();
  invalidKeys = _.map(invalidKeys, function (o) {
    return _.extend({message: context.keyErrorMessage(o.name)}, o);
  });
  return _setError(invalidKeys[0].message);
}

_setError = function(error) {
  Session.set("error", error);
  Meteor.setTimeout(function() {
    Session.set("error", false);
  }, 10*1000);
}

_setAuthCookie = function(creds) {
  Cookie.set('credentials', JSON.stringify(creds));
}