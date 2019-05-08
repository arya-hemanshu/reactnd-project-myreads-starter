import React from 'react';

const sectionNames = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read'
}

const BookSection = props => {

  return (
    <div className="list-books-content">
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{sectionNames[props.name]}</h2>
          <div className="bookshelf-books">
            {
              props.books.length === 0 && (
                <div className='book-authors'
                      style={{fontSize: '20px'}}>
                  You have no books in this Shelf
                </div>
              )
            }
            {
              props.books.length > 0 && (
                <ol className="books-grid">
                  {
                    props.books.map(book => (
                      <li key={book.props.id}>
                        {book}
                      </li>
                    ))
                  }
                </ol>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default BookSection;