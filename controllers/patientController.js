const Patient = require("../models/Patient");
const { getClassification } = require("../helpers/constant");
const moment = require("moment");

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

    const randomClas = Math.floor(Math.random() * 4) + 1;
    const countGejala = symptomsId.length <= 10 ? 0 : randomClas;
    const resultCoders = countGejala === 0 ? 0 : 1;
    const age = moment().diff(dateBirth, "years");

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
        resultCode: resultCoders,
        result: resultCoders === 0 ? "Positif" : "Negatif",
        criteriaCode: countGejala,
        criteriaStatus: getClassification(countGejala),
        inputBy: req.decoded.id,
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
    const order = orderBy === "newest" ? "DESC" : "ASC";
    var findCondition = { deleteAt: null };
    if (search) {
      findCondition = {
        deleteAt: null,
        name: { $regex: new RegExp(search, "i") },
      };
    }
    try {
      const response = await Patient.find(findCondition)
        .populate("symptomsId inputBy")
        .sort([["createdAt", order]])
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
