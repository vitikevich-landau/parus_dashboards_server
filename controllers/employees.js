const Employees = require("../models/Employees");

const list = async (req, res) => {
    try {
        const employees = await Employees.list();
        res.send(employees.map(v => ({...v, value: v.FULLNAME})));
    } catch (e) {
        res.send({error: "Something Wrong!!!"}).status(404);
    }
};

module.exports = {
    list
}