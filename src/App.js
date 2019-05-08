import React from 'react';
import {Route} from 'react-router-dom';
import './App.css'
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import MyReads from './MyReads';
import Book from './Book';

const initialState = {}

class BooksApp extends React.Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    allBooks: {}
  }

  onSectionChange = (newSection, book) => {
    const bookShelf = book.props.shelf
    BooksAPI.update({id: book.props.id}, newSection)
      .then(res => {
        const newBook = (<Book 
                          bookTitle={book.props.bookTitle} 
                          authors={book.props.authors}
                          id={book.props.id}
                          shelf={newSection}
                          url={book.props.url}
                          onSectionChange={this.onSectionChange}/>)

        if(bookShelf === 'none') {
          this.setState(prevState => ({
            [`${newSection}`] : [...prevState[`${newSection}`], newBook],
            allBooks: {...prevState.allBooks, [`${book.props.id}`]: newSection}
          }))
        } else {
          const previousSection = this.state[`${bookShelf}`]
          const previousSectionWithDeletedBook = 
                            previousSection.filter(b => b.props.id !== book.props.id)

          if (newSection === 'none') {
            let deleteBook = Object.assign({}, this.state.allBooks)
            delete deleteBook[book.props.id]
            this.setState(() => ({
              [`${bookShelf}`]: previousSectionWithDeletedBook.length > 0 ? previousSectionWithDeletedBook : [],
              allBooks: deleteBook
            }))
          } else {
            let changeShelf = Object.assign({}, this.state.allBooks)
            changeShelf[book.props.id] = newSection
            this.setState(prevState => ({
              [`${bookShelf}`]: previousSectionWithDeletedBook.length > 0 ? previousSectionWithDeletedBook : [],
              [`${newSection}`]: [...prevState[`${newSection}`], newBook],
              allBooks: changeShelf
            }))
          }


        }

    })
  }

  componentDidMount() {
    const tempMap = {}
    BooksAPI.getAll()
      .then(books => {
        books.forEach(book => {
          const currBook = (<Book 
                            bookTitle={book.title} 
                            authors={book.authors}
                            id={book.id}
                            shelf={book.shelf}
                            url={book.imageLinks.smallThumbnail}
                            onSectionChange={this.onSectionChange}/>)

          if (book.shelf in initialState) {
            initialState[book.shelf].push(currBook)
          } else {
            initialState[book.shelf] = [currBook]
          }
          tempMap[book.id] = book.shelf

        })
        this.setState({
          currentlyReading: 'currentlyReading' in initialState ?
                            initialState['currentlyReading'] : [],
          wantToRead      : 'wantToRead' in initialState  ?
                            initialState['wantToRead'] : [],
          read            : 'read' in initialState ? 
                            initialState['read'] : [],
          allBooks        :  tempMap
        })
    })


  }

  render() {
    return (
      <div> 
        <Route exact path='/' render={() => 
          (<MyReads initialState={this.state} />
        )}/>

        <Route path='/search' render={() => (
          <SearchBooks initialState={this.state} 
          onSectionChange={this.onSectionChange}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp;
