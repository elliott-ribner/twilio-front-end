
StepSchema = new SimpleSchema({
  name: {
    type: String,
    optional: false
  },
  body: {
    type: String,
    optional: false
  },
  expectedResponse: {
    type: String,
    optional: false,
    allowedValues: ["String", "Number"]
  }
});

ConversationSchema = new SimpleSchema({
  phoneNumber: {
    type: String,
    min: 10,
    max: 10,
    optional: false
  },
  defaultResponse: {
    type: String,
    optional: false
  },
  ownerEmail: {
    type: String,
    optional: false,
    regEx: SimpleSchema.RegEx.Email
  },
  steps: {
    type: [StepSchema],
    optional: true
  }
});
