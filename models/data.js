var Schema = require('mongoose').Schema;
module.exports = {
  name: 'Data',
  schema: {
    data: Buffer,
    'creator': {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  autoLoad: {
    'getAll': false,
    'getOne': false,
    'update': false,
    'delete': false
  }
};