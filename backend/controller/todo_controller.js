import Todo from "../model/todo_model.js";

export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user: req.user._id
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Task created Successfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occured in Task creation" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({user: req.user._id});
    res.status(201).json({ message: "Fetching tasks Successfully", todos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occured in fetching Tasks" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({ message: "Updating tasks Successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occured in updating Task" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not Found" });
    }
    res.status(201).json({ message: "Deleting tasks Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occured in deleting Task" });
  }
};


export const editTask = async (req, res) => {
  const { id } = req.params; 
  const { text, completed } = req.body;

  try {
    const updatedTask = await Todo.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
      error: error.message,
    });
  }
};
