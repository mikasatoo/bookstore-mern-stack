import express from 'express';
import { PORT } from './config.js';

const app = express();

app.listen(PORT, (err) => {
    if (err) console.log("Error in server setup");
    console.log(`App is listening on port: ${PORT}`);
});