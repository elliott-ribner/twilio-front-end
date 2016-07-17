Template.error.helpers({
  error: function() {
    return Session.get("error");
  }
})

Template.error.events({
  'click .close': function(e,t) {
    e.preventDefault();
    Session.set("error", false);
  }
})