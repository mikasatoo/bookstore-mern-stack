import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Define routes on the router ->
// Route for Save a new Book
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: 'Send all required fields: title, author, publishYear' });
        };

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    };
});

// Route for Get All Books from database
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: 'Send all required fields: title, author, publishYear' });
        };

        const id = req.params['id'];

        const updatedBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            updatedAt: new Date(),
        };

        const result = await Book.findByIdAndUpdate(id, updatedBook);

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
router.delete('/:id', async (req, res) => {
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

export default router;