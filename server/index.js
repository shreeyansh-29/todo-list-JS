const express = require("express");
const todos = require("./routes/todos");
const cors = require("cors");

const app = express();

app.use(express.json());

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "DELETE"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.use("/todos", todos);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
