import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to the MERN Stack Tutorial');
});

// Mount the router module on the '/books' path
app.use('/books', booksRoute);

// Connect to MongoDB database
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, (err) => {
            if (err) console.log("Error in server setup");
            console.log(`App is listening on port: ${PORT}`);
        });        
    })
    .catch((err) => {
        console.log(err);
    });