const {connectAndExecute} = require("../db/config");
const Utils = require("./Utils");

class LosersInfo {
  static TB_NAME = `UDO_V_PA_JAMBS`;

  static list = async (month, year) => {
    const data = await connectAndExecute(`
      select 
        * 
      from 
        ${LosersInfo.TB_NAME} 
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
  // static update = async ()
}

module.exports = LosersInfo;