import React from "react"

const Book = (props) => {
	const book = props.book
	return (
		<li>
			<div className='book'>
				<div className='book-top'>
					<div
						className='book-cover'
						style={{
							width: 128,
							height: 193,
							backgroundImage: `url(${
								book.imageLinks ? book.imageLinks.thumbnail : ""
							})`,
						}}
					></div>
					<div className='book-shelf-changer'>
						<select
							value={book.shelf || "none"}
							onChange={(e) => {
								props.updateBook({
									book: book,
									shelf: e.target.value,
								})
							}}
						>
							<option value='move' disabled>
								Move to...
							</option>
							<option value='currentlyReading'>Currently Reading</option>
							<option value='wantToRead'>Want to Read</option>
							<option value='read'>Read</option>
							<option value='none'>None</option>
						</select>
					</div>
				</div>
				<div className='book-title'>{book.title}</div>
				{book.authors && (
					<div className='book-authors'>{book.authors.join(", ")}</div>
				)}
			</div>
		</li>
	)
}

export default Book
