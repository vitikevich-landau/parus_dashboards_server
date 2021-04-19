const Attendants = require('../models/Attendants');

const list = async (req, res) => {
    try {
        const employees = await Attendants.list();
        res.send(employees);
    } catch (e) {
        res.send({error: "Something Wrong!!!"}).status(404);
    }
};

const change = async (req, res) => {
    const {body} = req;
    console.log(body);
    const {FULLNAME, IS_ACTIVE, SKIPPED, NUM} = body;

    try {
        await Attendants.change(FULLNAME, IS_ACTIVE, SKIPPED, NUM);
        res.send({success: true});
    } catch (e) {
        res.send({error: "Something Wrong!!!"}).status(404);
    }
};

const changeOrder = async (req, res) => {
    const {body} = req;
    const {NUM: oldNum, index: newNum} = body;
    console.log(body);

    try {
        await Attendants.changeOrder(oldNum, newNum);
        res.send({success: true});
    } catch (e) {
        res.send({error: "Something Wrong!!!"}).status(404);
    }
};

module.exports = {
    list,
    change,
    changeOrder
}