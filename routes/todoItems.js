const router = require('express').Router();
const todoItemController = require('../controllers/todoItemController');
const { protect } = require('../middleware/auth');

router.post('/api/addItem', protect, todoItemController.addItem);

router.get('/api/getAllTodos', protect, todoItemController.getTodos);

router.patch('/api/updateTodo/:id', protect, todoItemController.updateTodo);

router.delete('/api/deleteTodo/:id', protect, todoItemController.deleteTodo);


module.exports = router;