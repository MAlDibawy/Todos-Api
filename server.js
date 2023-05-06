const express = require('express');
require('dotenv').config();
const cors = require('cors');
const TodoItemRoute = require('./routes/todoItems');
const UserRoutes = require('./routes/userRoutes');

const connectDB = require('./config/db');

const PORT = process.env.PORT || 4001;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(TodoItemRoute);
app.use(UserRoutes);

// connect to database
connectDB();

//connect to server
app.listen(PORT, () => console.log("Server connected on port: " + PORT));


