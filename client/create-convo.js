import Models from './models'
Template.createConvo.helpers({

  loggedIn: function() {
    return Session.get("credentials");
  },
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
      phoneNumber: phoneNumber,
      defaultResponse: defaultResponse,
      ownerEmail: ownerEmail,
      steps: []
    };
    var convoContext = ConversationSchema.newContext();
    convoContext.validate(opts);
    if (convoContext.isValid()) {
      Session.set('convo', opts);
    } else {
      return _exposeSchemaError(convoContext);
    }
  }
})

Template.createStep.events({
  'submit form': function(e) {
    e.preventDefault();
    var step = {
      name: e.target.name.value,
      body: e.target.body.value,
      expectedResponse: e.target.expectedResponse.options[e.target.expectedResponse.options.selectedIndex].text
    }
    var stepContext = ConversationSchema.newContext();
    var previousConvo = Session.get('convo');
    previousConvo.steps.push(step);
    stepContext.validate(previousConvo);
    if (stepContext.isValid()) {
      Session.set('convo', previousConvo);
    } else {
      return _exposeSchemaError(stepContext)
    }
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