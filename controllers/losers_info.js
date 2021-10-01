const JambsParamModel = require("../models/losers_info/JambsParamModel");
const JambsModel = require("../models/losers_info/JambsModel");

const jambsList = async (req, res) => {
  const {params} = req;
  const {month, year} = params;

  try {
    const data = await JambsModel.list(month, year);

    res.send(data);
  } catch (e) {
    console.log(e)
    res.status(404).send({error: {...e, message: e.message}});
  }
}

const jambsFill = async (req, res) => {
  const {body} = req;
  const {month, year} = body;

  try {
    const data = await JambsModel.fill(month, year);

    res.send(data);
  } catch (e) {
    console.log(e.message);
    res.status(404).send({error: {...e, message: e.message}});
  }
}

const jambsUpdate = async (req, res) => {
  const {body} = req;
  const {RN, TEMPER} = body;

  console.log(body);

  try {
    const data = await JambsModel.update(RN, TEMPER);

    res.send(data);
  } catch (e) {
    console.log(e.message);
    res.status(404).send({error: {...e, message: e.message}});
  }
}

const coeffsList = async (req, res) => {
  const {params} = req;
  const {month, year} = params;

  try {
    const data = await JambsParamModel.list(month, year);

    res.send(data);
  } catch (e) {
    console.log(e)
    res.status(404).send({error: {...e, message: e.message}});
  }
}

const coeffsUpdate = async (req, res) => {
  const {body} = req;
  const {month, year, params} = body;

  try {
    const data = await JambsParamModel.update(month, year, JSON.parse(params));

    res.send(data);
  } catch (e) {
    console.log(e.message)
    res.status(404).send({error: {...e, message: e.message}});
  }
}

module.exports = {
  jambsList,
  jambsFill,
  jambsUpdate,
  coeffsList,
  coeffsUpdate
};