Template.register.helpers({
  loggedIn: function() {
    return Session.get("credentials");
  }
});

Template.register.events({
  'submit form': function(e) {
    e.preventDefault();
    var email = $("[name=email]").val();
    var password = $("[name=password]").val();
    var opts = {
      email: email,
      password: password
    }
    Meteor.call("register", opts, function(err, res) {
      if (err) {return console.log(err)}
      console.log("result",res)
      Session.set("credentials", res);
    });
    //email eeee@gggg.com
    //password password
    //(978) 208-4878


  }
})