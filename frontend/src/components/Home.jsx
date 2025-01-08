/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [updatedText, setUpdatedText] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/todo/fetch`, {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                });
                console.log(response.data.todos);
                setTodos(response.data.todos);
                setError(null);
            } catch (error) {
                setError("Failed to Fetch");
            } finally {
                setLoading(false);
            }
        };

        fetchTodo();
    }, []);

    const todoCreate = async () => {
        if (!newTodo) return;
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/todo/create`,
                { text: newTodo, completed: false },
                { withCredentials: true }
            );
            setTodos([...todos, response.data.newTodo]);
            setNewTodo("");
        } catch (error) {
            setError("Failed to create Task");
        }
    };

    const todoStatus = async (id) => {
        const todo = todos.find((t) => t._id === id);
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/todo/update/${id}`,
                {
                    ...todo,
                    completed: !todo.completed,
                },
                {
                    withCredentials: true,
                }
            );
            // console.log(response.data.todo);
            setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
        } catch (error) {
            setError("Failed to find Task status");
        }
    };

    const todoDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/todo/delete/${id}`, {
                withCredentials: true,
            });
            setTodos(todos.filter((t) => t._id !== id));
        } catch (error) {
            setError("Failed to Delete Task");
        }
    };

    const handleEditClick = (task) => {
        setSelectedTask(task);
        setUpdatedText(task.text);
        setIsModalOpen(true);
    };

    const handleUpdateTask = async (id) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/todo/edit/${id}`,
                { text: updatedText, completed: selectedTask.completed },
                {
                    withCredentials: true,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                }
            );
            toast.success("Task updated successfully!");
            setIsModalOpen(false);

            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === id ? { ...todo, text: updatedText } : todo
                )
            );
        } catch (error) {
            console.error(
                "Failed to update task:",
                error.response?.data || error.message
            );
            alert("Failed to update task.");
        }
    };

    const logout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/logout`, {
                withCredentials: true,
            });
            toast.success("User logged Out Successfully");
            localStorage.removeItem("jwt");
            navigate("/login");
        } catch (error) {
            toast.error("Error in Logging Out");
        }
    };

    return (
        <div className="my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
            <h1 className="text-2xl font-semibold text-center">Todo App</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Add the Task"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="flex-grow p-2 border rounded-l-md focus:outline-none"
                />
                <button
                    onClick={todoCreate}
                    className="bg-blue-600 border rounded-r-md text-white py-2 px-4 hover:bg-blue-900 duration-300"
                >
                    Add
                </button>
            </div>
            {loading ? (
                <div className="text-center justify-center">
                    <span className="text-gray-500">Loading...</span>
                </div>
            ) : error ? (
                <div className="text-center text-red-600 font-semibold">{error}</div>
            ) : (
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li
                            className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
                            key={todo._id}
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => todoStatus(todo._id)}
                                    className="mr-2"
                                />
                                <span
                                    className={`${todo.completed
                                        ? "line-through text-gray-800 font-semibold"
                                        : ""
                                        } `}
                                >
                                    {todo.text}
                                </span>
                            </div>

                            <button
                                onClick={() => handleEditClick(todo)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => todoDelete(todo._id)}
                                className="text-red-500 hover:text-red-800 duration-300"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                        <input
                            type="text"
                            value={updatedText}
                            onChange={(e) => setUpdatedText(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleUpdateTask(selectedTask._id)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => logout()}
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block"
            >
                Logout
            </button>
        </div>
    );
};

export default Home;
