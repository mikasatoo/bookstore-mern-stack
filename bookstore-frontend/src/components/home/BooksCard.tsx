import BooksSingleCard from './BooksSingleCard';

type Book = {
    _id: string
    title: string
    author: string
    publishYear: number
    createdAt: Date
    updatedAt: Date
}

const BooksCard = ({ books }) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {books.map((book: Book) => (
                <BooksSingleCard key={book._id} book={book} />
            ))}
        </div>
    );
};

export default BooksCard;