const express = require("express");
const router = express.Router();
const Joi = require("joi");

const todos = [];

router.get("/", (req, res) => {
  return res.status(200).send(todos);
});

router.post("/", (req, res) => {
  const {error} = validateItem(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const item = {id: todos.length + 1, item: req.body.item};
  todos.push(item);
  return res.status(200).send(todos);
});

router.delete("/:id", (req, res) => {
  const item = todos.find((e) => e.id === parseInt(req.params.id));
  if (!item) return res.send("Item Not Found").status(404);

  const index = todos.indexOf(item);
  todos.splice(index, 1);

  res.status(200).send(todos);
});

const validateItem = (data) => {
  const schema = {
    item: Joi.string().min(3).required(),
  };

  return Joi.validate(data, schema);
};

module.exports = router;
