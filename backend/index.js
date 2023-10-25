import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to the MERN Stack Tutorial');
});

// Route for Save a new Book
app.post('/books', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: 'Send all required fields: title, author, publishYear' });
        };

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    };
});

// Route for Get All Books from database
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(201).json({
            count: books.length,
            data: books
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    };
});

// Route for Get One Book by id
app.get('/books/:id', async (req, res) => {
    try {
        const id = req.params['id'];
        const book = await Book.findById(id);
        return res.status(201).json(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    };
});

// Route for Update a Book
app.put('/books/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: 'Send all required fields: title, author, publishYear' });
        };

        const id = req.params['id'];
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book successfully updated' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    };
});

// Route for Delete a Book
app.delete('/books/:id', async (req, res) => {
    try {
        const id = req.params['id'];
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book successfully deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    };
});

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