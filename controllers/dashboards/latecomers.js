const PieChart = require("../../models/latecomers/PieChart");
const LineChart = require("../../models/latecomers/LineChart");
const DatatableDetails = require("../../models/latecomers/DatatableDetails");
const BarChart = require("../../models/latecomers/BarChart");

const pieChart = async (req, res) => {
    const {params} = req;
    const {day, month, year} = params;

    try {
        const data = await PieChart.list(day, month, year);

        res.send(data);
    } catch (e) {
        res.send({error: e}).status(404);
    }
};

const lineChart = async (req, res) => {
    const {params} = req;
    const {day, month, year} = params;

    try {
        const data = await LineChart.list(day, month, year);

        /***
         *  Обрезать по количеству дней в выбранном месяце
         * */
        res.send(data.slice(0, new Date(year, month, 0).getDate()));
    } catch (e) {
        console.log(e);
        res.send({error: "Something Wrong!!!"}).status(404);
    }
}

const datatableDetails = async (req, res) => {
    const {params} = req;
    const {day, month, year} = params;

    try {
        const data = await DatatableDetails.list(day, month, year);

        res.send(data);
    } catch (e) {
        console.log(e);
        res.send({error: "Something Wrong!!!"}).status(404);
    }
};

const barChart = async (req, res) => {
    const {params} = req;
    const {day, month, year} = params;

    try {
        const data = await BarChart.list(day, month, year);

        res.send(data);
    } catch (e) {
        res.send({error: "Something Wrong!!!"}).status(404);
    }
};


module.exports = {
    pieChart,
    lineChart,
    datatableDetails,
    barChart
};