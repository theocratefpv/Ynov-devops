const db = require('../models');

exports.getBooks = () => {
    return db.books.findAll();
}

exports.getBookById = (id) => {
    return db.books.findAll({
        where: {
            id
        }
    });
}

exports.addBook = (title, date) => {
    return db.books.create({title, date});
}

exports.deleteBookById = (id) => {
    return db.books.destroy({
        where: {
            id
        }
    });
}