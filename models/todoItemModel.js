const mongoose = require('mongoose');

const TodoItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Todo', TodoItemSchema);