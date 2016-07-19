Template.layout.helpers({
  addPaddingIfNotHome: function() {
    var route = Router.current().route.getName()
    if (route === '/' || route === '/home') {
      return "<div class='home-padding'></div>";
    } else {
      return "<div class='not-home-padding'></div>";
    }
  }
})

Template.layout.onCreated(function() {
  var cookCreds = Cookie.get('credentials');
  if (cookCreds) {
    Session.set('credentials', JSON.parse(cookCreds));
  }
})