'use strict';

module.exports = Object.freeze({
  errorMessages: {
    invalidTypes: {
      number: 'Invalid type - must be number',
      boolean: 'Invalid type - must be boolean',
      date: 'Invalid type - must be date',
      string: 'Invalid type - must be string',
      enum: 'Invalid enum type',
      accountType: 'Invalid account type',
    },
  },
  enum: Object.freeze({
    sportType: {
      NFL: 'NFL',
      EPL: 'EPL',
    },
  }),
  numberOfPlayers: 5,
});
