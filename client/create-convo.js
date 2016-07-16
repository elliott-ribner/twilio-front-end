Template.createConvo.helpers({
  hasBase: function() {
    return Session.get('convo')
  },
  steps: function() {
    if (Session.get('convo')) {
      var index = -1;
      return Session.get('convo').steps.map(function(step) {
        step.index = index + 1;
        return step;
      });
    } else {
      return [];
    }
  }
})

Template.createConvo.events({
  'click #create-convo': function(e) {
    var convo = Session.get('convo');
    var opts = {
      defaultResponse: convo.base.defaultResponse,
      convoSteps: convo.steps,
      token: Session.get('credentials').token
    }
    Meteor.call('createConvo', opts, function(err, res) {
      if (err) {console.log(err)}
      else {
        console.log(res);
        alert('Great Job, text this number to get started!');
      }
    })
  }
})

Template.convoMaster.events({
  'submit form': function(e) {
    e.preventDefault();
    var phoneNumber = e.target.phoneNumber.value;
    var defaultResponse = e.target.defaultResponse.value;
    var ownerEmail = Session.get('credentials').email;
    var opts = {
      base: {
        phoneNumber: phoneNumber,
        defaultResponse: defaultResponse,
        ownerEmail: ownerEmail
      },
      steps: []
    }
    Session.set('convo', opts)
  }
})

Template.createStep.events({
  'submit form': function(e) {
    e.preventDefault();
    var name = e.target.name.value;
    var body = e.target.body.value;
    var expectedResponse = e.target.expectedResponse.value;
    var step = {
      name: name,
      body: body,
      expectedResponse: expectedResponse
    }
    var previousConvo = Session.get('convo');
    previousConvo.steps.push(step);
    Session.set('convo',previousConvo);
  }
})

Template.viewStep.events({
  'click #delete': function(e) {
    e.preventDefault();
    var convo = Session.get('convo');
    convo.steps.splice(this.index, 1);
    Session.set("convo", convo);
  }
})