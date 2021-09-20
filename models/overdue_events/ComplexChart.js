const Utils = require("../Utils");
const {connectAndExecute} = require("../../db/config");

class ComplexChart {
    static list = async (day, month, year) => {
        const data = await connectAndExecute(`
            select 
                * 
            from 
                TABLE(UDO_PKG_PA_WEB_EXPIRATION.GetCOMBOLine(:day, :month, :year))
        `,
            {day, month, year}
        );

        return Utils.convert(data);
    }
}

module.exports = ComplexChart;