'use strict';var _GUIDParser = require('./GUIDParser');var _GUIDParser2 = _interopRequireDefault(_GUIDParser);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //eslint-disable-line


function done(err) {
  if (err) {
    console.log('There was an error ' + err);
  } else {
    console.log('Done!');
  }
}

_GUIDParser2.default.getData('../../../data/input/MergedJSON.json', done);