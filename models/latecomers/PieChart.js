const Utils = require("../Utils");
const {connectAndExecute} = require("../../db/config");

class PieChart {
    static TB_NAME = "UDO_T_PA_LATECOMERS";

    static list = async (day, month, year) => {
        const data = await connectAndExecute(`
            select
                X.FULLNAME,
                sum(X.VAL) as VAL
            from
                (
                    select
                        FULLNAME,
                        TO_DATE(LPAD(D, 2, '0')
                                || '-'
                                || LPAD(M, 2, '0')
                                || '-'
                                || Y, 'DD-MM-YYYY') as DT,
                        1 as VAL
                    from
                        UDO_T_PA_LATECOMERS
                    where
                        VAL like 'ОП%'
                ) X
            where
                DT between TO_DATE('01-'
                                   || LPAD(:month, 2, '0')
                                   || '-'
                                   || :year, 'DD-MM-YYYY') and TO_DATE(LPAD(:day, 2, '0')
                                                                   || '-'
                                                                   || LPAD(:month, 2, '0')
                                                                   || :year, 'DD-MM-YYYY')
            group by
                FULLNAME
            order by
                FULLNAME
        `,
            {day, month, year}
        );

        return Utils.convert(data);
    }
}

module.exports = PieChart;