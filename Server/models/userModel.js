const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  quoteLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuoteList', 
    },
  ],
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString(); 
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.passwordHash; 
    },
  });

module.exports = mongoose.model('User', userSchema);