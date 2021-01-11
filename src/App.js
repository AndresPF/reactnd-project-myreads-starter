import React from "react"
import * as BooksAPI from "./BooksAPI"
import "./App.css"
import { Route, Link } from "react-router-dom"
import BookSearch from "./BookSearch"
import Bookshelf from "./Bookshelf"

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }))
    })
  }

  updateBook = (query) => {
    BooksAPI.update(query.book, query.shelf).then(() => {
      query.book.shelf = query.shelf
      this.setState((currentState) => ({
        books: [
          ...currentState.books.filter((b) => b.id !== query.book.id),
          query.book,
        ],
      }))
    })
  }

  render() {
    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <div className='list-books'>
              <div className='list-books-title'>
                <h1>MyReads</h1>
              </div>
              <div className='list-books-content'>
                <div>
                  <Bookshelf
                    title='Currently Reading'
                    books={this.state.books.filter((book) => {
                      return book.shelf === "currentlyReading"
                    })}
                    updateBook={this.updateBook}
                  />
                  <Bookshelf
                    title='Want to Read'
                    books={this.state.books.filter((book) => {
                      return book.shelf === "wantToRead"
                    })}
                    updateBook={this.updateBook}
                  />
                  <Bookshelf
                    title='Read'
                    books={this.state.books.filter((book) => {
                      return book.shelf === "read"
                    })}
                    updateBook={this.updateBook}
                  />
                </div>
              </div>
              <div className='open-search'>
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )}
        />
        <Route
          path='/search'
          render={({ history }) => (
            <BookSearch updateBook={this.updateBook} books={this.state.books} />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
