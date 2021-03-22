const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const symptomsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    description: {
      type: String,
    },
    deleteAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Symptoms = mongoose.model('Symptoms', symptomsSchema);
module.exports = Symptoms;
