'use strict';

const filterDeleted = {
  forObject: data => {
    if (data) {
      return !data.deleted ? data : {};
    }
  },
  forArray: data => {
    if (data) {
      return data.filter(item => item.deleted === false);
    }
    return [];
  },
};

module.exports = { filterDeleted };
