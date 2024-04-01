const mongoose = require('mongoose');

const quoteListSchema = new mongoose.Schema({
  name: 'String' , 
  quotes: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote' 
  }
});

quoteListSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });

module.exports = mongoose.model('QuoteList', quoteListSchema);
