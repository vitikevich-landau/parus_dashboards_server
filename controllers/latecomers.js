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

    // console.log(params);

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


module.exports = {
    list,
    saveAll,
    select
};