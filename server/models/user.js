const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
    },
    isProfile: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
    },
    imageSHA256Hash: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);
module.exports = User;
