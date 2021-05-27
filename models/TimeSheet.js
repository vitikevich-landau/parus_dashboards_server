const Utils = require("./Utils");
const {connectAndExecute} = require('../db/config');

class TimeSheet {
    static TB_NAME = 'UDO_T_PA_TIMESHEET';

    static arrivalList = async () => {
        const data = await connectAndExecute(
            `
            select 
                * 
            from 
                ${TimeSheet.TB_NAME} 
            where 
                ACTION = 'ВХОД'
            order by 
                DT desc
        `
        );

        return Utils.convert(data);
    }

    static leaveList = async () => {
        const data = await connectAndExecute(
            `
            select 
                * 
            from 
                ${TimeSheet.TB_NAME} 
            where 
                ACTION = 'ВЫХОД'
            order by 
                DT desc
        `
        );

        return Utils.convert(data);
    }

    static update = async record => {
        const {ID, FULLNAME, NOTE, ACTION, DT, TM} = record;
        return await connectAndExecute(`
            update 
                ${TimeSheet.TB_NAME} 
            set
                FULLNAME = :FULLNAME,
                NOTE = :NOTE,
                ACTION = :ACTION,
                DT = to_date(:DT, 'YYYY-MM-DD HH24:MI:SS'),
                TM = to_date(:TM, 'YYYY-MM-DD HH24:MI:SS')
            where 
                ID = :ID
        `,
            {ID, FULLNAME, NOTE, ACTION, DT, TM},
            {autoCommit: true}
        );
    }

    static insert = async record => {
        const {ID, FULLNAME, NOTE, ACTION, DT, TM} = record;

        return await connectAndExecute(`
            insert into ${TimeSheet.TB_NAME} 
                (ID, FULLNAME, NOTE, ACTION, DT, TM)
            values 
                (
                    :ID, 
                    :FULLNAME, 
                    :NOTE, 
                    :ACTION, 
                    to_date(:DT, 'YYYY-MM-DD HH24:MI:SS'), 
                    to_date(:TM, 'YYYY-MM-DD HH24:MI:SS')
                )
        `,
            {ID, FULLNAME, NOTE, ACTION, DT, TM},
            {autoCommit: true}
        );
    }

    static delete = async record => {
        const {ID} = record;

        return await connectAndExecute(`
           delete from ${TimeSheet.TB_NAME} where ID = :ID
        `,
            {ID},
            {autoCommit: true}
        );
    }

}

module.exports = TimeSheet;