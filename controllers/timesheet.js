const TimeSheet  = require("../models/TimeSheet");

const arrivalList = async (req, res) => {
    try {
        const employees = await TimeSheet.arrivalList();

        res.send(employees);
    } catch (e) {
        res.send({error: "Something Wrong!!!"}).status(404);
    }
};

const leaveList = async (req, res) => {
    try {
        const employees = await TimeSheet.leaveList();

        res.send(employees);
    } catch (e) {
        res.send({error: "Something Wrong!!!"}).status(404);
    }
};

const update = async (req, res) => {
    const {body} = req;

    try {
        const affected = await TimeSheet.update(body);

        console.log(affected);
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

        console.log(affected);
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