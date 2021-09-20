const Utils = require("./Utils");
const {connectAndExecute, connectAndExecuteMany} = require('../db/config');

class Latecomers {
  static EMPLOYEES = 'UDO_T_PA_PARUS_EMPLOYEES';
  static VIEW_LATECOMERS = 'UDO_V_PA_LATECOMERS';

  static list = async (month, year) => {
    const latecomers = await connectAndExecute(`
      select
        F.ID,
        F.FULLNAME,
        NVL(L.M, :month) as M,
        NVL(L.Y, :year) as Y,
        L.D1,
        L.D2,
        L.D3,
        L.D4,
        L.D5,
        L.D6,
        L.D7,
        L.D8,
        L.D9,
        L.D10,
        L.D11,
        L.D12,
        L.D13,
        L.D14,
        L.D15,
        L.D16,
        L.D17,
        L.D18,
        L.D19,
        L.D20,
        L.D21,
        L.D22,
        L.D23,
        L.D24,
        L.D25,
        L.D26,
        L.D27,
        L.D28,
        L.D29,
        L.D30,
        L.D31
    from
        ${Latecomers.EMPLOYEES}   F
        left join ${Latecomers.VIEW_LATECOMERS}        L
        on L.FULLNAME = F.FULLNAME
           and M = :month
           and Y = :year
    order by
        F.FULLNAME
    `,
      {month, year}
    );

    return Utils.convert(latecomers);
  }
  static saveAll = async data => {
    /***
     *  Предварительная очистка перед вставкой
     * */
    await connectAndExecute(`delete from UDO_T_PA_LATECOMERS_TMP`, {}, {autoCommit: true});

    return await connectAndExecuteMany(`
        insert into UDO_T_PA_LATECOMERS_TMP
            (ID, FULLNAME, M, Y, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11,  D12, D13, D14, D15, D16,D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28, D29, D30, D31)
        VALUES
            (:ID, :FULLNAME, :M, :Y, :D1, :D2, :D3, :D4, :D5, :D6, :D7, :D8, :D9, :D10, :D11,  :D12, :D13, :D14, :D15, :D16,:D17, :D18, :D19, :D20, :D21, :D22, :D23, :D24, :D25, :D26, :D27, :D28, :D29, :D30, :D31)
    `,
      data,
      {autoCommit: true}
    );
  }
  static setPeriod = async data => {
    return await connectAndExecute(`
           begin
                UDO_P_PA_LATECOMERS_MASS(to_date(:start_date, 'DD.MM.YYYY'), to_date(:end_date, 'DD.MM.YYYY'), :employee, :day_type, :weekends);
           end; 
        `,
      data,
      {autoCommit: true}
    );
  }

  static checkPeriod = async data => {
    return await connectAndExecute(`
        select 
            UDO_F_PA_LATECOMERS_CHECK(to_date(:start_date,'DD.MM.YYYY'), to_date(:end_date,'DD.MM.YYYY'), :employee)
        from 
            DUAL
    `,
      data,
      {autoCommit: true}
    );
  }

}

module.exports = Latecomers;