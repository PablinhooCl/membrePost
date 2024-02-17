const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post_msg: {
    type: String,
    required: true,
    maxlength: 174,
  },
  date: { type: Date, required: true },
  media: {
    type: [{
      type: String,
      validate: {
        validator(value) {
          return /^\/uploads\/.+/.test(value);
        },
        message: (props) => `${props.value} no es una ruta del contenido válida`,
      },
    }],
    validate: {
      validator(value) {
        return value.length <= 5;
      },
      message: 'No se permiten más de 5 uploads',
    },
  },

});

module.exports = mongoose.model('Post', PostSchema);
