const todoItemModel = require('../models/todoItemModel');

exports.addItem = async (req, res) => {
    try {
        const newItem = new todoItemModel({
            item: req.body.item
        });
        await newItem.save();
        res.status(200).json(newItem);
    } catch (error) {
        res.json(error);
    }
}

exports.getTodos = async (req, res) => {
    try {
        const allTodos = await todoItemModel.find({});
        res.status(200).json(allTodos);
    } catch (error) {
        res.json(error);
    }
}

exports.updateTodo = async (req, res) => {
    try {
        await todoItemModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json('Todo Updated Successfully.');
    } catch (error) {
        res.json(error);
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        await todoItemModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Todo Deleted Successfully.");
    } catch (error) {
        res.json(error);
    }
}