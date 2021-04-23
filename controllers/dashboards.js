const Latecomers = require("../models/Latecomers");

const lineChart = async (req, res) => {
  const {params} = req;
  const {month, year} = params;
  
  /***
   * Current month
   *
   * */
  const today = new Date();
  // const month = today.getMonth() + 1;
  // const year = today.getFullYear();
  // const cumulativeSum = (s => v => s += v);
  
  try {
    
    const employees = await Latecomers.list(month, year);
    /***
     *
     *  Преобразуем в формат для отображения в графике
     *  Возможно придётся тянуть данные из нескольких таблиц
     *
     *  Обрезать по количеству дней в месяце
     * */
    
    const days = Object.keys(employees[0]).filter(v => v.match(/^D\d+/));
    
    const transformed = employees.map(
      v => Object.assign(
        {},
        ...days.map(d => ({[d]: v[d] && +!!v[d].match(/ОП/)}))
      )
    );
    
    const groupedByDays = days.map(d => ({[d]: transformed.map(v => v[d])}));
    
    let rows = groupedByDays
      .map(v =>
        Object.keys(v).map(
          k => {
            const obj = {day: k.replace(/\D/, '')};
            
            /***
             *  Если текущий >= запрашиваемый месяц
             * */
            if (today.getMonth() + 1 >= month) {
              obj.lates = v[k].reduce((a, b) => a + b)
            } else {
              obj.lates = null;
            }
            return obj;
          }
        )
      )
      .flat();
    
    /***
     *  Занулить значения больше текущего дня
     * */
    if (today.getMonth() + 1 === +month) {
      rows = rows.map(v => ({
        ...v,
        lates: v.day <= today.getDate() ? v.lates : null
      }));
    }
    
    /***
     *  Обрезать по количеству дней в выбранном месяце
     * */
    res.send(rows.slice(0, new Date(year, month, 0).getDate()));
  } catch (e) {
    res.send({error: "Something Wrong!!!"}).status(404);
  }
};

const pieChart = async (req, res) => {
  const {params} = req;
  const {month, year} = params;
  
  /***
   * Current month
   *
   * */
  const today = new Date();
  // const month = today.getMonth() + 1;
  // const year = today.getFullYear();
  // const cumulativeSum = (s => v => s += v);
  
  try {
    
    const employees = await Latecomers.list(month, year);
    /***
     *
     *  Преобразуем в формат для отображения в графике
     *  Возможно придётся тянуть данные из нескольких таблиц
     *
     *  Обрезать по количеству дней в месяце
     * */
    
    const days = Object.keys(employees[0]).filter(v => v.match(/^(D\d+|FULLNAME)/));
    
    const transformed = employees.map(
      v => Object.assign(
        {},
        ...days.map(d => {
          if (d.match(/^(D\d+)/)) {
            if (v[d] && v[d].match(/ОП/)) {
              return {[d]: +!!v[d]}
            } else {
              // console.log(v[d]);
              return {[d]: 0}
            }
          }
          
          return {[d]: v[d]};
        })
      )
    );
    
   const rows = transformed.map(v => {
     const vals = Object.values(v);
     const [fullname, ...days] = vals;
     return {
       fullname,
       count: days.reduce((a, b) => a + b)
     }
   })
  
    res.send(rows.filter(v => v.count > 0));
  } catch (e) {
    res.send({error: "Something Wrong!!!"}).status(404);
  }
};

const datatable = async (req, res) => {

};

module.exports = {
  lineChart,
  pieChart,
  datatable
};


