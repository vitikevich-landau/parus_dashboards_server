const Utils = require("../Utils");
const {connectAndExecute} = require("../../db/config");

class DatatableDetails {
    static TB_NAME = "UDO_V_PA_LATECOMERS_TODAY";

    static list = async (day, month, year) => {
        console.log(day, month, year);
        const data = await connectAndExecute(`
            select
                rownum,
                X.*
            from
                (
                    select
                        F.FULLNAME,
                        NVL(sum(M.OP_MONTH), 0) as OP_MONTH,
                        NVL(sum(Y.OP_YEAR), 0) as OP_YEAR
                    from
                        UDO_T_PA_PARUS_EMPLOYEES F
                        left join (
                            select
                                T.FULLNAME,
                                sum(OP_MONTH) as OP_MONTH,
                                sum(OP_YEAR) as OP_YEAR
                            from
                                UDO_V_PA_LATECOMERS_TODAY T
                            where
                                T.DT >= TO_DATE(LPAD('01', 2, '0')
                                                || '-'
                                                || LPAD(:month, 2, '0')
                                                || '-'
                                                || :year, 'DD-MM-YYYY')
                                and T.DT <= TO_DATE(LPAD(:day, 2, '0')
                                                    || '-'
                                                    || LPAD(:month, 2, '0')
                                                    || '-'
                                                    || :year, 'DD-MM-YYYY')
                            group by
                                T.FULLNAME
                        ) M
                        on F.FULLNAME = M.FULLNAME
                        left join (
                            select
                                T.FULLNAME,
                                sum(OP_MONTH) as OP_MONTH,
                                sum(OP_YEAR) as OP_YEAR
                            from
                                UDO_V_PA_LATECOMERS_TODAY T
                            where
                                T.DT >= TO_DATE('01-01-' || :year, 'DD-MM-YYYY')
                                and T.DT <= TO_DATE(LPAD(:day, 2, '0')
                                                    || '-'
                                                    || LPAD(:month, 2, '0')
                                                    || '-'
                                                    || :year, 'DD-MM-YYYY')
                            group by
                                T.FULLNAME
                        ) Y
                        on F.FULLNAME = Y.FULLNAME
                    group by
                        F.FULLNAME
                    order by
                        OP_YEAR desc
                ) X
        `,
            {day, month, year}
        );

        return Utils.convert(data);
    }
}

module.exports = DatatableDetails;