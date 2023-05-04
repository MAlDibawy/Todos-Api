const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const TodoItemRoute = require('./routes/todoItems');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());

app.use(TodoItemRoute);

// connect to database
connectDB();

const PORT = process.env.PORT || 4001;

//connect to server
app.listen(PORT, () => console.log("Server connected on port: " + PORT));


