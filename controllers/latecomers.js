const Latecomers = require("../models/Latecomers");

const list = async (req, res) => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  try {
    const data = await Latecomers.list(month, year);
    res.send(data);

  } catch (e) {
    res.send({error: "Something Wrong!!!"}).status(404);
  }
};

const select = async (req, res) => {
  const {params} = req;
  const {month, year} = params;

  try {
    const data = await Latecomers.list(month, year);
    res.send(data);

  } catch (e) {
    res.send({error: "Something Wrong!!!"}).status(404);
  }
};

const saveAll = async (req, res) => {
  const {body} = req;
  const raw = Object.values(body);
  const items = raw.map(v => JSON.parse(v));

  try {
    const affected = await Latecomers.saveAll(items);
    res.send(affected);
  } catch (e) {
    res.send({error: "Something Wrong!!!"}).status(404);
  }
};

const setPeriod = async (req, res) => {
  const {body} = req;
  const {start_date, end_date} = body;
  const startDate = start_date
    .split(" ")[0]
    .split("-")
    .reverse()
    .join(".");
  const endDate = end_date
    .split(" ")[0]
    .split("-")
    .reverse()
    .join(".");

  const data = {
    ...body,
    start_date: startDate,
    end_date: endDate
  }

  try {
    const affected = await Latecomers.setPeriod(data);
    res.send(affected);
  } catch (e) {
    res.status(500).send("Something wrong!");
  }
}

const checkPeriod = async (req, res) => {
  const {params} = req;

  try {
    const affected = await Latecomers.checkPeriod(params);
    res.send(affected.rows[0]);
  } catch (e) {
    res.status(500).send("Something wrong!");
  }
};

module.exports = {
  list,
  saveAll,
  select,
  setPeriod,
  checkPeriod
};