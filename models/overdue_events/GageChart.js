const Utils = require("../Utils");
const {connectAndExecute} = require("../../db/config");

class GageChart {
    static list = async (day, month, year, type) => {
        const data = await connectAndExecute(`
            select
                *
            from
                table (UDO_PKG_PA_WEB_EXPIRATION.GETCURDATE(:day, :month, :year, :type))
            order by 
                VALUE desc
        `,
            {day, month, year, type}
        );

        return Utils.convert(data);
    }
}

module.exports = GageChart;