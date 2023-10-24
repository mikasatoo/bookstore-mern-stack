import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to the MERN Stack Tutorial');
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, (err) => {
            if (err) console.log("Error in server setup");
            console.log(`App is listening on port: ${PORT}`);
        });        
    })
    .catch((error) => {
        console.log(error);
    });