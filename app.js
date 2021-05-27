var express = require('express');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const kitchenAttendantRouter = require('./routes/kitchen_attendant');
const latecomersAttendantRouter = require('./routes/latecomers');
const dashboardsRouter = require('./routes/dashboards');
const timeSheetRouter = require('./routes/timesheet');
const employeesRouter = require('./routes/employees');

const cors = require("cors");

const {showAuthPrompt} = require('./middlewares/basic_auth');

var app = express();

/**
 *  DEDUG ONLY !!!
 */
// app.use(cors());


/***
 *  logger options
 * */
logger.token("date", function () {
    const [, month, day, year, time, , timezone] = new Date()
        .toString()
        .replace(/[A-Z]{3}\+/, "+")
        .split(/ /);
    return `${day}/${month}/${year} ${time} ${timezone}`;
});

app.use(logger('common'));

app.use(logger('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/***
 *  Protect routes
 * */
app.use(showAuthPrompt);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/employees', employeesRouter);
app.use('/api/kitchen-attendant', kitchenAttendantRouter);
app.use('/api/latecomers', latecomersAttendantRouter);
app.use('/api/dashboards', dashboardsRouter);
app.use('/api/timesheet', timeSheetRouter);

module.exports = app;
