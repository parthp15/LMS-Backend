const express = require("express");
const router = express.Router();
const { Book, validate } = require("../models/book");

//GET
router.get("/", async (req, res) => {
  const book = await Book.find()
    .populate("author", "name -_id")
    .populate("category", "name -_id");
  res.send(book);
});

//GET by ID
router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id)
    .populate("author", "name -_id")
    .populate("category", "name -_id");
  if (!book)
    return res.status(404).send("No book with the given ID was not found.");
  res.send(book);
});
//POST
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { name, author, numberInStock, rentalRate, category } = req.body;
  const book = new Book({
    name,
    author,
    numberInStock,
    rentalRate,
    category,
  });
  const result = await book.save();
  res.send(result);
});
//UPDATE
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const book = await Book.findById(req.params.id);
  if (!book)
    return res.status(404).send("No Author with the given ID was not found.");
  book.set({
    name: req.body.name,
    author: req.body.author,
    numberInStock: req.body.numberInStock,
    rentalRate: req.body.rentalRate,
    category: req.body.category,
  });
  book.save();
  res.send(book);
});
//DELETE
router.delete("/:id", async (req, res) => {
  const result = await Book.findByIdAndDelete(req.params.id);
  res.send(result);
});

module.exports = router;
