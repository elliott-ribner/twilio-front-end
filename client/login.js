Template.login.helpers({
  loggedIn: function() {
    return Session.get("credentials");
  }
})
Template.login.events({
  'click #submit-login': function() {
    var email = $("[name=email]").val();
    var password = $("[name=password]").val();
    var opts = {
      email: email,
      password: password
    }
    Meteor.call("login", opts, function(err, res) {
      if (err) {return console.log(err)}
      console.log("result",res)
      Session.set("credentials", res);
    });
    //email eeee@gggg.com
    //password password
  }
})