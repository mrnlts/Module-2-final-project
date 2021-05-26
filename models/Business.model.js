const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const businessSchema = new Schema(
  {
    businessName: String,
    businessType: {
      type: String,
      enum: [
        'shop',
        'Pizza',
        'Chinese',
        'Sushi',
        'Italian',
        'Japanese',
        'Thai',
        'Vietnamese',
        'Tapas',
        'Mexican',
        'Mediterranean',
        'Gourmet',
        'French',
        'Hamburguer',
        'Kebab',
        'FastFood',
        'Vegan',
        'Vegetarian',
      ],
    },
    imageUrlBusiness: String,
    city: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const Business = model('Business', businessSchema);

module.exports = Business;
