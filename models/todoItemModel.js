const mongoose = require('mongoose');

const TodoItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
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