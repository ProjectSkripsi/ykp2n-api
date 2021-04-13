const Symptoms = require('../models/Symptoms');

module.exports = {
  getCategory: async (type) => {
    const response = await Symptoms.find({
      deleteAt: null,
    });
    return response;
  },

  sumType: async (type) => {
    let sum = 0;
    const response = await Symptoms.find({
      deleteAt: null,
      diagnose: type,
    });
    for (const val of response) {
      sum += Number(val.bobot);
    }
    return Number(sum.toFixed(2)) / 2;
  },

  sumDiagnose: (arr) => {
    let sum = 0;
    for (const val of arr) {
      sum += Number(val.bobot);
    }
    return Number(sum.toFixed(2));
  },
};
