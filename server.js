const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const TodoItemRoute = require('./routes/todoItems');

const app = express();

app.use(express.json());
app.use(cors());

app.use(TodoItemRoute);

//connect to mongodb
mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err))

const PORT = process.env.PORT || 4001;

//connect to server
app.listen(PORT, () => console.log("Server connected on port: " + PORT));


