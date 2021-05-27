const Utils = require("../Utils");
const {connectAndExecute} = require("../../db/config");

class BarChart {
    static list = async (day, month, year) => {
        const data = await connectAndExecute(`
            with L_MONTH as (
                select
                    rownum as M
                from
                    DUAL
                connect by
                    LEVEL <= 12
            ), LC as (
                select
                    TO_DATE(LPAD(D, 2, '0')
                            || '-'
                            || LPAD(M, 2, '0')
                            || '-'
                            || Y, 'DD-MM-YYYY') as DT,
                    D,
                    M,
                    Y,
                    1 as VAL
                from
                    UDO_T_PA_LATECOMERS
                where
                    VAL like 'ОП%'
            ), LC_G as (
                select
                    M,
                    Y,
                    count(VAL) as VAL
                from
                    LC
                where
                    DT >= TO_DATE('01-01-' || :year, 'DD-MM-YYYY')
                    and
                    DT <= TO_DATE(LPAD(:day, 2, '0')
                                  || '-'
                                  || LPAD(:month, 2, '0')
                                  || '-'
                                  || :year, 'DD-MM-YYYY')
                group by
                    M,
                    Y
            )
            select
                F_GET_MONTH(L_MONTH.M) as MONTH,
                LC_G.Y,
                LC_G.VAL,
                UDO_F_PA_LATECOMERS_FIO_LIST_Y(L_MONTH.M, LC_G.Y) as FIO_LIST
            from
                L_MONTH LEFT
                join LC_G
                on L_MONTH.M = LC_G.M
            order by
                L_MONTH.M
        `,
            {day, month, year}
        );

        return Utils.convert(data);
    }
}

module.exports = BarChart;