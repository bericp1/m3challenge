var Schema = require('mongoose').Schema;
module.exports = {
  name: 'Thing',
  schema: {
    data: String,
    type: String,
    'creator': {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    color: {
      'type': String,
      'default': 'default'
    }
  }
};