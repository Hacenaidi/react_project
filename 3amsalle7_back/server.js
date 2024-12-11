const express = require("express");
const app = express();
const db = require('./models');
const supportRouter = require('./routers/supportRouter');
const technicienRouter = require('./routers/TechnicienRouter');
const ticketRouter = require('./routers/TicketRouter');
const { Sequelize } = require('sequelize');
const config = require('./config/config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

app.use('/public', express.static(__dirname + '/public', {
    setHeaders: (res, path, stat) => {
        res.set('Content-Type', '*');
    }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});
app.use('/api', supportRouter);
app.use('/api', technicienRouter);
app.use('/api', ticketRouter);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);
    })
    .then(() => {
        return db.sequelize.sync();
    })
    .then(() => {
        app.listen(5005, () => console.log("server running.."));
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });