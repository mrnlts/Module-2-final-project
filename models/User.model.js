const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    passwordHash: {
      type: String,
      trim: true,
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
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  },
);

const User = model('User', userSchema);

module.exports = User;
