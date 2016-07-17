Template.register.helpers({
  loggedIn: function() {
    return Session.get("credentials");
  }
});

Template.register.onRendered(function() {
  $("#register-user").validate({
    rules: {
      email: "required",
      password: {
        required: true,
        minlength: 7,
        maxlength: 40
      },
      password_two: {
        equalTo: "#password"
      }
    }
  });
});

Template.register.events({
  'submit form': function(e) {
    e.preventDefault();
    Session.set("error", false);
    var email = $("[name=email]").val();
    var password = $("[name=password]").val();
    var opts = {
      email: email,
      password: password
    }
    Meteor.call("register", opts, function(err, res) {
      if (err) {return console.log(err)}
      console.log("result",res);
      if (res.success) {
        Session.set("credentials", res);  
      } else {
        _setError("server error: registration not successfull");
      }
    });
    //email eeee@gggg.com
    //password password
    //(978) 208-4878
  }
})
