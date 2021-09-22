const Joi = require("joi");
const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  email: { type: String },
});
const Author = mongoose.model("Author", authorSchema);
function validateAuthor(author) {
  const schema = {
    name: Joi.string().required().min(3).max(25),
    email: Joi.string().min(3).max(25).trim(),
  };
  return Joi.validate(author, schema);
}

exports.Author = Author;
exports.validate = validateAuthor;
