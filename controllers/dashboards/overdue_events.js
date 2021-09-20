const GageChart = require("../../models/overdue_events/GageChart");
const ComplexChart = require("../../models/overdue_events/ComplexChart");

const gageChart = async (req, res) => {
    const {params} = req;
    const {day, month, year, type} = params;

    try {
        const data = await GageChart.list(day, month, year, type);

        res.send(data);
    } catch (e) {
        res.send({error: e}).status(404);
    }
};

const complexChart = async (req, res) => {
    const {params} = req;
    const {day, month, year} = params;

    try {
        const data = await ComplexChart.list(day, month, year);

        res.send(data.slice(0, new Date(year, month, 0).getDate()));
        // res.send(data);
    } catch (e) {
        res.send({error: e}).status(404);
    }
};

module.exports = {
    gageChart,
    complexChart
}
