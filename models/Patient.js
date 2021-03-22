const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const patientSchema = new Schema(
  {
    nik: {
      type: String,
    },
    trackId: {
      type: String,
      default: shortid.generate,
    },
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
    placeBirth: {
      type: String,
    },
    dateBirth: {
      type: String,
    },
    criteriaCode: {
      type: Number,
    },
    criteriaStatus: {
      type: String,
    },
    inputBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    result: {
      type: String,
    },
    resultCode: {
      type: Number,
    },
    symptomsId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Symptoms',
      },
    ],
    deleteAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
