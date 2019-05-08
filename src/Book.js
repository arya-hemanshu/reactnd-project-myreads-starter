import React from 'react';
import BookMenuOptions from './BookMenuOptions';

const Book = props => {

    const onSectionChange = (newSection) => {
        props.onSectionChange(newSection, props)
    }

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" 
                    style={{ width: 128, height: 193, 
                    backgroundImage: `url("${props.url}")` }}>
                </div>
                <BookMenuOptions selected={props.shelf} 
                                onSectionChange={onSectionChange}/>
            </div>
            <div className="book-title">{props.bookTitle}</div>
            <div className="book-authors">{props.authors.join(', ')}</div>
        </div>
    )
}

export default Book;