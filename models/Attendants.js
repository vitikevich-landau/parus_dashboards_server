const {connectAndExecute} = require('../db/config');

class Attendants {
    static TB_NAME = 'UDO_T_PA_KITCHEN_ATTENDANT';

    static list = async () => {
        const data = await connectAndExecute(`
      select * from ${Attendants.TB_NAME} order by NUM
    `);
        const {metaData, rows} = data;

        return rows.map(
            v => {
                const obj = {};
                v.forEach((k, i) => obj[metaData[i].name] = k);
                return obj;
            }
        );
    }

    static change = async (fullName, isActive, skipped, num) => {
        /**
         *  Обнуляем поле is_active у всех
         *  Если оно изменилось
         *
         * */
        if (+isActive) {
            await connectAndExecute(
                `
        update
          ${Attendants.TB_NAME}
        set
          is_active = 0
      `,
                {},
                {autoCommit: true}
            );
        }

        await connectAndExecute(
            `
        update 
          ${Attendants.TB_NAME} 
        set 
          fullname = :fullName,
          is_active = :isActive,
          skipped = :skipped
        where
          num = :num
        `,
            {fullName, isActive, skipped, num},
            {autoCommit: true}
        );
    };

    static changeOrder = async (oldNum, newNum) => {
        await connectAndExecute(
            `
        update
          ${Attendants.TB_NAME}
        set
          num = 0
        where
          num = :oldNum
        `,
            {oldNum},
            {autoCommit: true}
        );

        if (oldNum <= newNum - 1) {
            console.log("if");
            await connectAndExecute(
                `
        update
          ${Attendants.TB_NAME}
        set
          num = num - 1
        where
          num in (select num from ${Attendants.TB_NAME} where num >= :oldNum
          and num <= :newNum)
        `,
                {oldNum, newNum: newNum},
                {autoCommit: true}
            );


        } else {
            await connectAndExecute(
                `
        update
          ${Attendants.TB_NAME}
        set
          num = num + 1
        where
          num in ( select num from ${Attendants.TB_NAME} where
          num <= :oldNum
          and num >= :newNum)
        `,
                {oldNum, newNum: newNum},
                {autoCommit: true}
            );

        }

        await connectAndExecute(
            `
        update
          ${Attendants.TB_NAME}
        set
          num = :newNum
        where
          num = 0
        `,
            {newNum},
            {autoCommit: true}
        );
    }
}

module.exports = Attendants;
