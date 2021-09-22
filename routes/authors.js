const express = require("express");
const router = express.Router();
const { Author, validate } = require("../models/author");

//GET
router.get("/", async (req, res) => {
  const author = await Author.find();
  res.send(author);
});

//GET by ID
router.get("/:id", async (req, res) => {
  const author = await Author.findById(req.params.id);
  res.send(author);
});
//POST
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const author = new Author({
    name: req.body.name,
    email: req.body.email,
  });
  const result = await author.save();
  res.send(result);
});
//UPDATE
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const author = await Author.findById(req.params.id);
  if (!author)
    return res.status(404).send("No Author with the given ID was not found.");
  author.set({
    name: req.body.name,
    email: req.body.email,
  });
  author.save();
  res.send(author);
});
//DELETE
router.delete("/:id", async (req, res) => {
  const result = await Author.findByIdAndDelete(req.params.id);
  res.send(result);
});

module.exports = router;
