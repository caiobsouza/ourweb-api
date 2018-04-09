const express = require("express");
const mongoose = require("mongoose");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

const base = require('./routes/base');
app.use('/', base);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));