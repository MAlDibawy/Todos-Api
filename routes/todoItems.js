const router = require('express').Router();
const todoItemController = require('../controllers/todoItemController');


router.post('/api/addItem', todoItemController.addItem);

router.get('/api/getAllTodos', todoItemController.getTodos);

router.patch('/api/updateTodo/:id', todoItemController.updateTodo);

router.delete('/api/deleteTodo/:id', todoItemController.deleteTodo);


module.exports = router;