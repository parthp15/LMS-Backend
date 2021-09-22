const Joi = require("joi");
const mongoose = require("mongoose");
const { Author } = require("./author");
const { Category } = require("./category");

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: Author },
  numberInStock: {
    type: Number,
    required: true,
  },
  rentalRate: {
    type: Number,
    required: true,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: Category },
});
const Book = mongoose.model("Book", bookSchema);
function validateBook(book) {
  const schema = {
    name: Joi.string().required().min(3).max(25),
    author: Joi.string().trim().required(),
    numberInStock: Joi.number().required(),
    rentalRate: Joi.number().required(),
    category: Joi.string().required(),
  };
  return Joi.validate(book, schema);
}

exports.Book = Book;
exports.validate = validateBook;
