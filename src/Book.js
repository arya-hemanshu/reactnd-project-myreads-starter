import React, {Component} from 'react';
import BookMenuOptions from './BookMenuOptions';

class Book extends Component {

    onSectionChange = (newSection) => {
        this.props.onSectionChange(newSection, this)
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" 
                        style={{ width: 128, height: 193, 
                        backgroundImage: `url("${this.props.url}")` }}>
                    </div>
                    <BookMenuOptions selected={this.props.shelf} 
                                     onSectionChange={this.onSectionChange}/>
                </div>
                <div className="book-title">{this.props.bookTitle}</div>
                <div className="book-authors">{this.props.authors.join(', ')}</div>
            </div>
        )
    }
}

export default Book;