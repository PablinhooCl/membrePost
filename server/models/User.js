const mongoose = require('mongoose');

const { Schema } = mongoose;

const passwordValidator = (value) => {
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(value)) {
    throw new Error('Password must contain at least one uppercase letter');
  }

  // Check for at least one symbol (non-alphanumeric character)
  if (!/[^A-Za-z0-9]/.test(value)) {
    throw new Error('Password must contain at least one symbol');
  }

  return true;
};

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    minlength: 6,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    validate: [passwordValidator, 'Password validation failed, It s need at least a mayus character and a symbol'],
  },
  member: {
    type: Boolean,
    default: false,
    required: true,
  },
  profile_icon: {
    type: [{
      type: String,
      validate: {
        validator(value) {
          return value === null || value === undefined || (typeof value === 'string' && value.length > 0);
        },
        message: 'Profile icon must be a non-empty string or null/undefined.',
      },
    }],
  },
});

module.exports = mongoose.model('User', UserSchema);
