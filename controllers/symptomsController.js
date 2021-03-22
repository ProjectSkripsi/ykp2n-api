const Symptoms = require('../models/Symptoms');

module.exports = {
  addNew: async (req, res) => {
    const { name, code, description } = req.body;
    try {
      const findCode = await Symptoms.find({
        code,
      });
      if (findCode.length === 0) {
        const response = await Symptoms.create({
          name,
          code,
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
    const { search } = req.query;
    const skip =
      Number(currentPage) === 1
        ? 0
        : (Number(currentPage) - 1) * Number(pageSize);

    var findCondition = { deleteAt: null };
    if (search) {
      findCondition = {
        deleteAt: null,
        type: { $regex: new RegExp(search, 'i') },
      };
    }
    try {
      const response = await Symptoms.find(findCondition)
        .sort([['createdAt', 'DESC']])
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
    const { name, description } = req.body;
    try {
      const findCode = await Symptoms.find({
        code: codes,
      });
      if (findCode.length === 0) {
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
          msg: 'kode gejala sudah ada',
        });
      }
    } catch (error) {
      res.status(500).json(response);
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
