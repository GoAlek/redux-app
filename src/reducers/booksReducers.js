"user strict"

//BOOKS REDUCER
export function booksReducers(state = 
    {books: []   
    }, 
    action) {

    switch(action.type) {
        case "GET_BOOKS":
            return {...state, books:[...action.payload]}
        case "POST_BOOK":
            //let books = state.books.concat(action.payload);
            //return {books};
            return {
                ...state, 
                books: [...state.books, ...action.payload], 
                msg: 'Saved! Click to continue',
                style: 'success',
                validation: 'success'    
            }
        case "POST_BOOK_REJECTED":
            return {
                ...state, 
                msg: 'Please, try again', 
                style: 'danger',
                validation: 'error'
            }
        case "RESET_BUTTON":
            return {
                ...state, 
                msg: undefined, 
                style: 'primary',
                validation: null
            }
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