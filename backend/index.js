import express from 'express';
import { PORT } from './config.js';

const app = express();

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to the MERN Stack Tutorial');
});

app.listen(PORT, (err) => {
    if (err) console.log("Error in server setup");
    console.log(`App is listening on port: ${PORT}`);
});