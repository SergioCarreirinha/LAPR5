import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from '../api';
import config from '../config';
const fileUpload=require('express-fileupload');
const cors = require('cors');
export default async ({ app }: { app: express.Application }) => {

    app.get('/status', (req, res) => {
         res.status(200).end();
         });

    app.head('/status', (req, res) => {
         res.status(200).end(); 
        });

    app.enable('trust proxy');

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));

    // ...More middlewares

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json());

    app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }));

    // Load API routes
    app.use(config.api.prefix, routes());
    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
        return res
            .status(err.status)
            .send({ message: err.message })
            .end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
        errors: {
            message: err.message,
        },
        });
    });

    // Return the express app
    return app;
};


