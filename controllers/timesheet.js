const TimeSheet = require("../models/TimeSheet");

const arrivalList = async (req, res) => {
  try {
    const employees = await TimeSheet.arrivalList();
    const dateConverted = employees.map(v => ({
      ...v,
      DT: new Date(v.DT.getTime() - v.DT.getTimezoneOffset() * 60000)
    }));

    res.send(dateConverted);
  } catch (e) {
    res.send({error: "Something Wrong!!!"}).status(404);
  }
};

const leaveList = async (req, res) => {
  try {
    const employees = await TimeSheet.leaveList();
    const dateConverted = employees.map(v => ({
      ...v,
      DT: new Date(v.DT.getTime() - v.DT.getTimezoneOffset() * 60000)
    }));

    res.send(dateConverted);
  } catch (e) {
    res.send({error: "Something Wrong!!!"}).status(404);
  }
};

const update = async (req, res) => {
  const {body} = req;
  try {
    const affected = await TimeSheet.update(body);

    res.send(affected);
  } catch (e) {
    res.send({error: "Something Wrong!!!"}).status(404);
  }
};

const insert = async (req, res) => {
  const {body} = req;

  try {
    const affected = await TimeSheet.insert(body);

    console.log(affected);
    res.send(affected);
  } catch (e) {
    res.send({error: "Something Wrong!!!"}).status(404);
  }
};

const remove = async (req, res) => {
  const {body} = req;

  try {
    const affected = await TimeSheet.delete(body);

    res.send(affected);
  } catch (e) {
    res.send({error: "Something Wrong!!!"}).status(404);
  }
};

module.exports = {
  arrivalList,
  leaveList,
  update,
  insert,
  remove
};