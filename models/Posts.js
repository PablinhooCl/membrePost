const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  username: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: {
    type: String,
    required: true,
    maxlength: 174,
  },
  date: { type: Date, required: true },
  images: {
    type: [{
      type: String,
      validate: {
        validator(value) {
          return /^\/uploads\/.+\.jpg$/.test(value);
        },
        message: (props) => `${props.value} no es una ruta de imagen válida`,
      },
    }],
    validate: {
      validator(value) {
        return value.length <= 5;
      },
      message: 'No se permiten más de 5 imágenes',
    },
  },

});

module.exports = mongoose.model('Post', PostSchema);
