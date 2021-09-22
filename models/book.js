const Joi = require("joi");
const mongoose = require("mongoose");
const { Author } = require("./author");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  author: { type: [mongoose.Schema.Types.ObjectId], ref: Author },
});
const Book = mongoose.model("Book", authorSchema);
function validateBook(book) {
  const schema = {
    name: Joi.string().required().min(3).max(25),
    author: Joi.string().trim().required(),
  };
  return Joi.validate(book, schema);
}

exports.Book = Book;
exports.validate = validateBook;
