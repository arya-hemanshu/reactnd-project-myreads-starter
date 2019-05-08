import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BookSection from './BookSection';

class MyReads extends Component {

    render() {
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>

                    <div>
                        {
                            Object.keys(this.props.initialState).map(key => (
                                key !== 'allBooks' &&
                                    (<BookSection 
                                        key={key}
                                        books={this.props.initialState[key]}
                                        name={key}/>)
                            ))
                        }
                    </div>

                    <Link to='/search' className='open-search'>
                        Add a book
                    </Link>
                </div>
            </div>
        )
    }
}

export default MyReads;