//where we deal with our schema
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/memeDB', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var MemeSchema = mongoose.Schema({ //Defines the Schema for this database
    name: String,
    url: String,
    upvotes: {type: Number, default: 0}
});

MemeSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

MemeSchema.methods.downvote = function(cb) {
  this.upvotes -= 1;
  this.save(cb);
};

var Meme = mongoose.model('Meme', MemeSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});