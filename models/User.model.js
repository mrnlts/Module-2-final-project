const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    googleID: String,
    passwordHash: {
      type: String,
      required: [true, 'Password is required.'],
    },
    city: String,
    age: Number,
    role: {
      type: String,
      enum: ['business', 'customer'],
      default: 'customer'
    }
  },
  {
    timestamps: true,
  },
);

const User = model('User', userSchema);

module.exports = User;
