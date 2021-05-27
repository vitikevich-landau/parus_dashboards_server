const Utils = require("../Utils");
const {connectAndExecute} = require("../../db/config");

class LineChart {
    static TB_NAME = "UDO_V_PA_LATECOMERS_L_CHART";

    static list = async (day, month, year) => {
        const data = await connectAndExecute(`
            with L_DAYS as (
                select
                    rownum as D
                from
                    DUAL
                connect by
                    LEVEL <= 31
            ), LC as (
                select
                    D,
                    M,
                    Y,
                    count(VAL) as VAL
                from
                    UDO_T_PA_LATECOMERS
                where
                    VAL like 'ОП%'
                group by
                    D,
                    M,
                    Y
            )
            select
                L_DAYS.D as DAY,
                LC.M,
                LC.Y,
                case
                    when TO_NUMBER(L_DAYS.D) <= :day then
                        NVL(LC.VAL, 0)
                    else
                        null
                end as VAL,
                UDO_F_PA_LATECOMERS_FIO_LIST(L_DAYS.D, LC.M, LC.Y) as FIO_LIST
            from
                L_DAYS LEFT
                join LC
                on L_DAYS.D = LC.D
                   and TO_NUMBER(L_DAYS.D) <= :day
                   and LC.M = :month
                   and LC.Y = :year
            order by
                L_DAYS.D
        `,
            {day, month, year}
        );

        return Utils.convert(data);
    }
}

module.exports = LineChart;