import Restro from "../models/restroModel.js";

const getAllRestros = async (req, res) => {
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skipVal = (page - 1) * limit;
    const restros = await Restro.find().skip(skipVal).limit(limit);
    const totalRestros = await Restro.countDocuments();
    const numOfPages = Math.ceil(totalRestros / limit);
    // console.log(restros);
    res.json({
      status: "success",
      restros,
      totalRestros,
      numOfPages,
    });
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

const createRestro = async (req, res) => {
  try {
    const { name, location } = req.body;
    const newRestro = await Restro.create({ name, location });
    if (!newRestro) {
      throw new Error("error in adding restro");
    }
    res.json({
      status: "success",
      newRestro,
    });
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteRestro = async (req, res) => {
  try {
    const { id } = req.params;
    const restroExist = await Restro.findById(id);
    if (!restroExist) {
      throw new Error(`no restro find by id ${id} to delete`);
    }
    await Restro.findByIdAndDelete(id);
    res.json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

const updateRestro = async (req, res) => {
  try {
    const { id } = req.params;
    const restroExist = await Restro.findById(id);
    if (!restroExist) {
      throw new Error(`no restro find by id ${id} to update`);
    }
    const updatedRestro = await Restro.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    res.json({
      status: "success",
      updatedRestro,
    });
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

const getRestro = async (req, res) => {
  try {
    const { id } = req.params;
    const restroExist = await Restro.findById(id);
    if (!restroExist) {
      throw new Error(`no restro find by id ${id}`);
    }
    res.json({
      status: "success",
      restro: restroExist,
    });
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

export { getAllRestros, createRestro, deleteRestro, updateRestro, getRestro };
