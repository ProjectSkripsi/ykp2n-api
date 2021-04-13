const Patient = require('../models/Patient');
const Symptoms = require('../models/Symptoms');
const { getClassification } = require('../helpers/constant');
const { sumType, sumDiagnose } = require('../helpers/utils');
const moment = require('moment');

module.exports = {
  addPatient: async (req, res) => {
    const {
      nik,
      name,
      contact,
      address,
      placeBirth,
      dateBirth,
      symptomsId,
    } = req.body;

    const age = moment().diff(dateBirth, 'years');
    const gejala = await Symptoms.find({
      deleteAt: null,
    });

    const r = gejala.filter((elem) =>
      symptomsId.find((id) => {
        const symId = elem._id.toString();
        return symId === id;
      })
    );

    const putaw = r.filter((item) => item.diagnose === 'Putaw');
    const sabu = r.filter((item) => item.diagnose === 'Sabu');
    const ganja = r.filter((item) => item.diagnose === 'Ganja');
    const alkohol = r.filter((item) => item.diagnose === 'Alkohol');

    const accSympmtoms = [
      putaw.length,
      sabu.length,
      ganja.length,
      alkohol.length,
    ];
    const dataSym = [putaw, sabu, ganja, alkohol];
    let i = accSympmtoms.indexOf(Math.max(...accSympmtoms));
    console.log(accSympmtoms);
    const accumBobot = await sumType(
      i === 0 ? 'Putaw' : i === 1 ? 'Sabu' : i === 2 ? 'Ganja' : 'Alkohol'
    );
    const totalBobotInput = sumDiagnose(dataSym[i]);
    const result = totalBobotInput > accumBobot ? i : 4;

    try {
      const response = await Patient.create({
        nik,
        name,
        contact,
        address,
        placeBirth,
        dateBirth,
        symptomsId,
        age,
        resultCode: result,
        result: result === 0 ? 'Negatif' : 'Positif',
        criteriaCode: result,
        criteriaStatus: getClassification(result),
        inputBy: req.decoded.id,
        analyse: {
          data: dataSym[i],
          totalBobotInput,
          totalBobotTypeDiagnose: accumBobot * 2,
        },
      });
      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getPatients: async (req, res) => {
    const { pageSize, currentPage } = req.params;
    const { search, orderBy } = req.query;
    const skip =
      Number(currentPage) === 1
        ? 0
        : (Number(currentPage) - 1) * Number(pageSize);
    const order = orderBy === 'newest' ? 'DESC' : 'ASC';
    var findCondition = { deleteAt: null };
    if (search) {
      findCondition = {
        deleteAt: null,
        name: { $regex: new RegExp(search, 'i') },
      };
    }
    try {
      const response = await Patient.find(findCondition)
        .populate('symptomsId inputBy')
        .sort([['createdAt', order]])
        .limit(Number(pageSize) * 1)
        .skip(skip);
      const count = await Patient.countDocuments(findCondition);
      res.status(200).json({
        currentPage,
        data: response,
        pageSize,
        status: true,
        totalItem: count,
        totalPage: Math.ceil(count / Number(pageSize)),
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getPatientById: async (req, res) => {
    const { _id } = req.params;
    try {
      const response = await Patient.findById({
        _id,
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deletePatient: async (req, res) => {
    const { _id } = req.params;
    console.log(_id);
    try {
      const response = await Patient.findByIdAndRemove({
        _id,
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deletePatient: async (req, res) => {
    const { _id } = req.params;
    try {
      const response = await Patient.findByIdAndUpdate(
        {
          _id,
        },
        {
          deleteAt: new Date(),
        }
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(response);
    }
  },
};
