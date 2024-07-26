const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({ message: "Unable to register user." });
});


// Get the book list available in the shop
public_users.get('/', (req, res) => {
    //Write your code here

    let myPromise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise 1 resolved")
        }, 6000)
    })

    let myPromise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise 2 resolved")
        }, 3000)
    })

    myPromise1.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })

    myPromise2.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })

    res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function(req,
    res) {
    //Write your code here
    const isbn = req.params.isbn;
    let myPromise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise 1 resolved")
        }, 6000)
    })

    let myPromise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise 2 resolved")
        }, 3000)
    })

    myPromise1.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })

    myPromise2.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })

    res.send(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function(req, res) {
    //Write your code here
    const author = req.params.author;
    const bookKeys = Object.keys(books);
    const matchingBooks = [];

    let myPromise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise 1 resolved")
        }, 6000)
    })

    let myPromise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise 2 resolved")
        }, 3000)
    })

    myPromise1.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })

    myPromise2.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })
    for (const key of bookKeys) {
        if (books[key].author.toLowerCase() === author.toLowerCase()) {
            matchingBooks.push(books[key]);
        }
    }
    if (matchingBooks.length > 0) {
        res.json(matchingBooks);
    } else {
        res.status(404).json({ error: 'No books found for the author' });
    }
});

// Get all books based on title
public_users.get('/title/:title', function(req, res) {
    //Write your code here
    const title = req.params.title;
    const bookKeys = Object.keys(books);
    const matchingBooks = [];

    let myPromise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise 1 resolved")
        }, 6000)
    })
    let myPromise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise 2 resolved")
        }, 3000)
    })

    myPromise1.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })
    myPromise2.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })
    for (const key of bookKeys) {
        if (books[key].title.toLowerCase() === title.toLowerCase()) {
            matchingBooks.push(books[key]);
        }
    }
    if (matchingBooks.length > 0) {
        res.json(matchingBooks);
    } else {
        res.status(404).json({ error: 'No books found for the author' });
    }
});

//  Get book review
public_users.get('/review/:isbn', function(req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    const matchingBook = books[isbn];

    if (matchingBook) {
        const reviews = matchingBook.reviews;
        res.json(reviews);
    } else {
        res.status(404).json({ error: 'No book found for the ISBN' });
    }
});

module.exports.general = public_users;