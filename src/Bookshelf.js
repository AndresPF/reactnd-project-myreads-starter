import React, { Component } from "react"
import Book from "./Book"

class Bookshelf extends Component {
	render() {
		return (
			<div className='bookshelf'>
				<h2 className='bookshelf-title'>{this.props.title}</h2>
				<div className='bookshelf-books'>
					<ol className='books-grid'>
						{this.props.books.map((book) => (
							<Book
								key={book.id}
								book={book}
								updateBook={this.props.updateBook}
							/>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default Bookshelf
