Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('home');
});

Router.route('/login', function() {
  this.render('login')
});

Router.route('/register', function() {
  this.render('register');
})

Router.route('/create-convo', function() {
  this.render('createConvo');
})

