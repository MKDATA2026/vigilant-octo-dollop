const { v4: uuidv4 } = require('uuid');

function createTransactionReference() {
  return `MKDATA-${uuidv4()}`;
}

module.exports = {
  createTransactionReference
};
