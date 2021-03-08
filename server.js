const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('Unhandled Rejection X.X Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('Uncaught Exception X.X Shutting down...');
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM RECIVED. Shutting down gracefully!');
    server.close(()=> {
        console.log('Process terminated!');
    })
});