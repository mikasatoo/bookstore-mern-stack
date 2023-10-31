import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

type Book = {
    _id: string
    title: string
    author: string
    publishYear: number
    createdAt: Date
    updatedAt: Date
}

const ShowBook = () => {
    const [book, setBook] = useState<Book>({
        _id: '',
        title: '',
        author: '',
        publishYear: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    const [loading, setLoading] = useState<boolean>(false);
    const id = useParams<string>();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/books/${id.id}`)
            .then((res) => {
                setBook(res.data);
                setLoading(false);
            })
            .catch ((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>
                Show Book: {book.title}
            </h1>

            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Id</span>
                        <span>{book._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Title</span>
                        <span>{book.title}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Author</span>
                        <span>{book.author}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                        <span>{book.publishYear}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Created</span>
                        <span>{new Date(book.createdAt).toString()}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Last Updated</span>
                        <span>{new Date(book.updatedAt).toString()}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowBook;