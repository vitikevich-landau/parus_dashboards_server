class Utils {
    static convert = result => result.rows.map(
        v => {
            const obj = {};
            v.forEach((k, i) => obj[result.metaData[i].name] = k);
            return obj;
        }
    );
}

module.exports = Utils;