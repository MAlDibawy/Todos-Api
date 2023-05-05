const Todo = require('../models/todoItemModel');
const User = require('../models/userModel');

exports.addItem = async (req, res) => {
    try {
        const newItem = new Todo({
            item: req.body.item,
            user: req.user.id,
        });
        await newItem.save();
        res.status(200).json(newItem);
    } catch (error) {
        res.json(error);
    }
}

exports.getTodos = async (req, res) => {
    try {
        const allTodos = await Todo.find({ user: req.user.id });
        res.status(200).json(allTodos);
    } catch (error) {
        res.json(error);
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            res.status(400).json('Todo not found');
        } else {
            // check for user
            const user = await User.findById(req.user.id).select('-password');
            if (!user) {
                res.status(401).json('Unauthorized, User not found');
            }

            // check if logged in user matches the todo user
            else if (todo.user.toString() !== user.id) {
                res.status(401).json('Unauthorized User');
            } else {
                await Todo.findByIdAndUpdate(req.params.id, req.body);
                res.status(200).json('Todo Updated Successfully.');
            }
        }

    } catch (error) {
        res.json(error);
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        if (!todo) {
            res.status(400).json('Todo not found.')
        } else {
            // check for user
            const user = await User.findById(req.user.id);

            if (!user) {
                res.status(401).json('Unauthorized, User not found');
            }

            // check if logged in user matches the todo user
            else if (todo.user.toString() !== user.id) {
                res.status(401).json('Unauthorized User');
            } else {
                await Todo.findByIdAndDelete(req.params.id);
                res.status(200).json("Todo Deleted Successfully.");
            }
        }

    } catch (error) {
        console.log(error)
        res.status(500).json('Internal Server Error');
    }
}