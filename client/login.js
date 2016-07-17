Template.login.helpers({
  loggedIn: function() {
    return Session.get("credentials");
  }
});

Template.login.onRendered(function() {
  $("#login-user").validate({
    rules: {
      email: "required",
      password: "required"
    }
  })
});

Template.login.events({
  'submit form': function(e) {
    e.preventDefault();
    Session.set("error", false);
    var email = $("[name=email]").val();
    var password = $("[name=password]").val();
    var opts = {
      email: email,
      password: password
    }
    Meteor.call("login", opts, function(err, res) {
      if (err) {return console.log(err)}
      console.log("result",res);
      if(res.token) {
        Session.set("credentials", res);
      } else {
        _setError("server error: login not successful");
      }
    });
    //email eeee@gggg.com
    //password password
  }
})


_setError = function(error) {
  Session.set("error", error);
  Meteor.setTimeout(function() {
    Session.set("error", false);
  }, 10*1000);
}