const {connectAndExecute} = require("../../db/config");
const Utils = require("../Utils");

class JambsModel {
  static TB_NAME = `UDO_T_PA_JAMBS`;
  static V_NAME = `UDO_V_PA_JAMBS`;

  static list = async (month, year) => {
    const data = await connectAndExecute(`
      select 
        * 
      from 
        ${JambsModel.V_NAME} 
      where
        month = :month
      and 
        year = :year
      order by
        AGNNAME
    `,
      {month, year},
      {autoCommit: true}
    );

    return Utils.convert(data);
  }

  static fill = async (month, year) => {
    /***
     *  Пересчёт значений за месяц с учётом коэффициентов
     * */
    return await connectAndExecute(`
      begin
        UDO_P_PA_JAMBS_FILL(:month, :year);
      end;
    `,
      {month, year},
      {autoCommit: true}
    );
  }

  static update = async (RN, TEMPER) => {
    return await connectAndExecute(`
      update 
        ${JambsModel.TB_NAME} 
      set 
        TEMPER = :TEMPER 
      where 
        RN = :RN
    `,
      {RN, TEMPER},
      {autoCommit: true}
    );
  }
}

module.exports = JambsModel;