import React, { Component } from "react"
import { Link } from "react-router-dom"
import * as BooksAPI from "./BooksAPI"
import Book from "./Book"

class BookSearch extends Component {
	state = {
		books: [],
	}

	searchBook = (query) => {
		BooksAPI.search(query).then((books) => {
			if (books && !books.error) {
				const newBooks = books.map((book) => {
					const existingBook = this.props.books.find((b) => b.id === book.id)
					book.shelf = existingBook ? existingBook.shelf : book.shelf || "none"

					return book
				})
				this.setState(() => ({
					books: newBooks,
				}))
			} else {
				this.setState(() => ({
					books: [],
				}))
			}
		})
	}

	render() {
		return (
			<div className='search-books'>
				<div className='search-books-bar'>
					<Link className='close-search' to='/'>
						Close
					</Link>
					<div className='search-books-input-wrapper'>
						{/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
						<input
							type='text'
							placeholder='Search by title or author'
							onChange={(e) => {
								this.searchBook(e.target.value)
							}}
						/>
					</div>
				</div>
				<div className='search-books-results'>
					<ol className='books-grid'>
						{this.state.books.length > 0 ? (
							this.state.books.map((book) => (
								<Book
									key={book.id}
									book={book}
									updateBook={this.props.updateBook}
								/>
							))
						) : (
							<p>No Results</p>
						)}
					</ol>
				</div>
			</div>
		)
	}
}

export default BookSearch
