const Utils = require("./Utils");
const {connectAndExecute} = require('../db/config');


class Employees {
    static TB_NAME = 'UDO_T_PA_PARUS_EMPLOYEES';

    static list = async () => {
        const data = await connectAndExecute(`
                select t.*, rownum from ${Employees.TB_NAME} t
        `);

        return Utils.convert(data);
    }
}

module.exports = Employees;