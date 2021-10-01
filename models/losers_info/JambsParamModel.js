const Utils = require("../Utils");
const {connectAndExecute} = require("../../db/config");

class JambsParamModel {
  static TB_NAME = `UDO_T_PA_JAMBS_PARAM`;
  static V_NAME = `UDO_V_PA_JAMBS_PARAM`;

  static list = async (month, year) => {
    let data = await connectAndExecute(`
      select 
        * 
      from 
        ${JambsParamModel.TB_NAME} 
      where
        month = :month
      and 
        year = :year
    `,
      {month, year},
      {autoCommit: true}
    );

    /***
     *  Если в месяце нет параметров,
     *  брать с последнего заполненного месяца
     * */
    if (!data.rows.length) {
      data = await connectAndExecute(`
        select
          *
        from ${JambsParamModel.V_NAME}
      `)
    }

    return Utils.convert(data);
  }

  static update = async (month, year, params = {}) => {
    const {
      LATENESS,
      OVERDUE,
      DAY_8CH,
      EVENT_BONUS,
      OUT_WORK,
      TEMPER,
      WORK_HOURS,
      BASKET
    } = params;
    return await connectAndExecute(`
      begin
        UDO_T_PA_JAMBS_PARAM_FILL(
          :month, 
          :year,
          :LATENESS,
          :OVERDUE,
          :DAY_8CH,
          :EVENT_BONUS,
          :OUT_WORK,
          :TEMPER,
          :BASKET,
          :WORK_HOURS
        );
      end;
    `,
      {
        month,
        year,
        LATENESS,
        OVERDUE,
        DAY_8CH,
        EVENT_BONUS,
        OUT_WORK,
        TEMPER,
        WORK_HOURS,
        BASKET
      },
      {autoCommit: true}
    );
  }
}

module.exports = JambsParamModel;