const express = require('express')
const Todolist = require('../models/Todolist')
const fetchUser = require('../middleware/fetchuser')
const router = express.Router();
router.get(
  '/alltodo', fetchUser, async (req, res) => {
    try {
      const user_id = req.user.id
      const todolist = await Todolist.find({ userid: user_id })

      res.json(todolist);
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Internal Server Error')
    }
  }
)
router.post('/createtodo', fetchUser
  , async (req, res) => {
    try {
      const { title, description, status } = req.body
      let todolist = await Todolist.create({
        title, description,status, userid: req.user.id,
      });
      let n = await todolist.save()
      res.send(n)

    } catch (error) {
      console.log(error.message)
      res.status(500).send('Internal Server Error')
    }
  }
)
router.put('/updatetodo/:id', fetchUser, async (req, res) => {
  const { title, description } = req.body;
  const newTodo = {};
  if (title) { newTodo.title = title }
  if (description) { newTodo.description = description };
  let todolist = await Todolist.findById(req.params.id);
  if (!todolist) { return res.status(404).send("Not Found") }
  if (todolist.userid.toString() !== req.user.id) {
    return res.status(401).send("Not allowed")
  }
  todolist = await Todolist.findByIdAndUpdate(req.params.id, { $set: newTodo }, { new: true })
  res.json(newTodo);
}
)
router.put('/updatestatus/:id', fetchUser, async (req, res) => {
    const { status} = req.body;
    const newTodo = {};
    newTodo.status = status;
    let todolist = await Todolist.findById(req.params.id);
    if (!todolist) { return res.status(404).send("Not Found") }
    if (todolist.userid.toString() !== req.user.id) {
      return res.status(401).send("Not allowed")
    }
    todolist = await Todolist.findByIdAndUpdate(req.params.id, { $set: newTodo }, { new: true })
    res.json(newTodo);
  }
  )
router.delete('/deletetodo/:id', fetchUser, async (req, res) => {
  let todolist = await Todolist.findById(req.params.id);
  if (!todolist) { return res.status(404).send("Not Found") }
  if (todolist.userid.toString() !== req.user.id) {
    return res.status(401).send("Not allowed")
  }
  todolist = await Todolist.findByIdAndDelete(req.params.id)
  res.json("Success: Your Task has been deleted");

}
)
module.exports = router;