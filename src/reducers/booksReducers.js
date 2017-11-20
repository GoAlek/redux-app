"user strict"

//BOOKS REDUCER
export function booksReducers(state = 
    {books:
        [{
            _id: 1,
            title:'this is the book title',
            description: 'this is the book description',
            price: 33.33
        },
        {
            _id: 2,
            title:'this is the second book title',
            description: 'this is the second book description',
            price: 50
        }]   
    }, 
    action) {

    switch(action.type) {
        case "GET_BOOKS":
            return {...state, books:[...state.books]}
        case "POST_BOOK":
            //let books = state.books.concat(action.payload);
            //return {books};
            return {books:[...state.books, ...action.payload]}
        case "DELETE_BOOK":
            // Create a copy of the current array of books
            const currentBooksToDelete = [...state.books]
            const findBookByIdToDelete = function(book) {
                return book._id.toString() === action.payload;
            }
            const indexToDelete = currentBooksToDelete.findIndex(findBookByIdToDelete);
            return {books: [...currentBooksToDelete.slice(0, indexToDelete), 
                ...currentBooksToDelete.slice(indexToDelete + 1)]}
        case "UPDATE_BOOK":
            // Create a copy of the current array of books
            const currentBooksToUpdate = [...state.books]
            const findBookByIdToUpdate = function(book) {
                return book._id === action.payload._id;
            }
            const indexToUpdate = currentBooksToUpdate.findIndex(findBookByIdToUpdate);

            const newBookToUpdate = {
                ...currentBooksToUpdate[indexToUpdate],
                title: action.payload.title
            }

            console.log("what is the newBookToUpdate", newBookToUpdate);

            return {books: [...currentBooksToUpdate.slice(0, indexToUpdate), newBookToUpdate,
                ...currentBooksToUpdate.slice(indexToUpdate + 1)]}
    }
    return state;
}