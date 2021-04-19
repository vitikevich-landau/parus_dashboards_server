const oracledb = require(`oracledb`);

const DB_USER = `parus`;
const DB_PASSWORD = `123z`;
const DB_CONNECTION_STRING = `192.168.1.112:1521/UDPPA`;

const getConnection = () => {
    return oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING
    });
};

const connectAndExecute = async (sql, bindParams = {}, options = {}) => {
    let connection;

    try {
        connection = await getConnection();
        return await connection.execute(sql, bindParams, options);
    } catch (error) {
        /***
         *  Log error and throw up
         *
         */
        console.error(error);
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error(error);
            }
        }
    }
};

const connectAndExecuteMany = async (sql, bindParams = {}, options = {}) => {
    let connection;

    try {
        connection = await getConnection();
        return await connection.executeMany(sql, bindParams, options);
    } catch (error) {
        /***
         *  Log error and throw up
         *
         */
        console.error(error);
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error(error);
            }
        }
    }
};

module.exports = {
    connectAndExecute,
    connectAndExecuteMany,
    getConnection
}
