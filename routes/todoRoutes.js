const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
router.get('/todos/completed', async (req, res) => {
  try {
    const todos = await Todo.find({ completed: true });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/todos', async (req, res) => {
  try {
    const { title, completed, priority } = req.body;
    const newTodo = new Todo({ title, completed, priority });
    const savedTodo = await newTodo.save();
    
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/todos/:id', async (req, res) => {
  try {
    const { title, completed, priority } = req.body;
    
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, completed, priority },
      { new: true, runValidators: true }
    );
    
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete('/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
