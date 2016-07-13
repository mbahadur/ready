var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  phone: String,
  name: String,
  password:String,
  created_at: { type: Date, default: Date.now },
  isActive: boolean
});

module.exports = mongoose.model('User', UserSchema);