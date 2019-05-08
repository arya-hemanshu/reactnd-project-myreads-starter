import React, {Component} from 'react';

class BookMenuOptions extends Component {

    onChangeHandler = e => {
        this.props.onSectionChange(e.target.value)
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.props.selected} onChange={this.onChangeHandler}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead" >Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default BookMenuOptions;