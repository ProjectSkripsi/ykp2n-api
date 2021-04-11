const Symptoms = require('../models/Symptoms');
const { isEmpty } = require('lodash');

module.exports = {
  addNew: async (req, res) => {
    const { name, code, description, diagnose, bobot } = req.body;
    try {
      const findCode = await Symptoms.find({
        code,
      });
      if (findCode.length === 0) {
        const response = await Symptoms.create({
          name,
          code,
          diagnose,
          bobot,
          description,
        });
        res.status(201).json(response);
      } else {
        res.status(409).json({
          msg: 'kode gejala sudah ada',
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllPagination: async (req, res) => {
    const { pageSize, currentPage } = req.params;
    const { search, orderBy } = req.query;
    const order = orderBy === 'newest' ? 'DESC' : 'ASC';
    const skip =
      Number(currentPage) === 1
        ? 0
        : (Number(currentPage) - 1) * Number(pageSize);

    var findCondition = { deleteAt: null };
    if (search) {
      findCondition = {
        deleteAt: null,
        name: { $regex: new RegExp(search, 'i') },
      };
    }
    try {
      const response = await Symptoms.find(findCondition)
        .sort([['createdAt', order]])
        .limit(Number(pageSize) * 1)
        .skip(skip);
      const count = await Symptoms.countDocuments(findCondition);
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

  getById: async (req, res) => {
    const { _id } = req.params;
    try {
      const response = await Symptoms.findById({
        _id,
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(response);
    }
  },

  updateSymptoms: async (req, res) => {
    const { _id, codes } = req.params;
    const { name, description, diagnose, bobot } = req.body;
    try {
      const findCode = await Symptoms.find({
        code,
        deleteAt: null,
      });

      if (findCode.length === 1) {
        const response = await Symptoms.findOneAndUpdate(
          {
            code: codes,
          },
          {
            name,
            code: codes,
            description,
            diagnose,
            bobot,
          },
          {
            returnOriginal: false,
          }
        );
        res.status(200).json(response);
      } else {
        const symptomsId = findCode && findCode[0]._id;
        if (symptomsId.toString() === _id) {
          const response = await Symptoms.findByIdAndUpdate(
            {
              _id,
            },
            {
              name,
              code,
              description,
            },
            {
              returnOriginal: false,
            }
          );
          res.status(200).json(response);
        } else {
          res.status(409).json({
            msg: `kode gejala ${code} sudah ada`,
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  deleteSymptoms: async (req, res) => {
    const { _id } = req.params;
    try {
      const response = await Symptoms.findByIdAndDelete({
        _id,
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(response);
    }
  },

  getAll: async (req, res) => {
    try {
      const response = await Symptoms.find({ deleteAt: null });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(response);
    }
  },
};
