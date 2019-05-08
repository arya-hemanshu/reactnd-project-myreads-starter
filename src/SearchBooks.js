import React, {Component} from 'react';
import {DebounceInput} from 'react-debounce-input';
import {Link} from 'react-router-dom';
import * as BooksApi from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component {

    state = {
        value: '',
        books: {}
    }

    onSectionChange = (newSection, book) => {
        let newBook = Object.assign({}, this.state.books)
        newBook[book.id].shelf = newSection
        this.setState({books: newBook})

        this.props.onSectionChange(newSection, book)

    }

    onChangeHandler = searchTerm => {
        const tempBooks = {}

        this.setState(() => ({
            value : searchTerm
        }))
        
        if (searchTerm !== '') {
            BooksApi.search(searchTerm)
            .then(books => {    
                if (books !== undefined && books.length > 0) {
                    books.forEach(book => {
                        tempBooks[book.id] = {
                          authors: book.authors, 
                          title: book.title,
                          shelf: this.props.initialState.allBooks !== undefined && 
                                 book.id in this.props.initialState.allBooks ? 
                                 this.props.initialState.allBooks[book.id] : 
                                 'none',
                          imageLinks: book.imageLinks
                        }
                    })
                    this.setState({books: tempBooks})   
                } else {
                    this.setState({books: {}})
                }
            })
        } else {
            this.setState({books: {}})
        }  
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        
                        <DebounceInput 
                            debounceTimeout={1000}
                            type="text" 
                            placeholder="Search by title or author"
                            value={this.state.value}
                            onChange={e => this.onChangeHandler(e.target.value)}/>

                    </div>
                </div>
                {
                    Object.keys(this.state.books).length > 0 && (
                        <div className="search-books-results">
                            <ol className="books-grid">
                                {
                                    Object.keys(this.state.books).map(bookId => (
                                        <li key={bookId}><Book 
                                            bookTitle={this.state.books[bookId].title} 
                                            authors={ this.state.books[bookId].authors !== undefined &&
                                                        this.state.books[bookId].authors.length > 0  ?
                                                        this.state.books[bookId].authors : 
                                                        ['Not Available']}
                                            id={bookId}
                                            shelf={this.state.books[bookId].shelf}
                                            url={this.state.books[bookId].imageLinks !== undefined ?
                                                this.state.books[bookId].imageLinks.smallThumbnail : 
                                                'falseImage.jpg'}
                                            onSectionChange={this.onSectionChange}
                                            />
                                        </li>
                                    ))
                                }
                            </ol>
                        </div>
                    )
                }
                
            </div>
        )
    }
}

export default SearchBooks;