Todo App
vercel Link -: https://todo-submit-3oqh.vercel.app
Overview
The Todo App is a full-stack web application designed to help users manage their tasks effectively. Users can create, edit, delete, and toggle the completion status of their tasks. The app also includes user authentication to ensure secure access to the tasks.
Features
• User authentication with JWT.
• Add, edit, delete, and mark tasks as complete or incomplete.
• Responsive UI for seamless user experience.
• Persistent storage of tasks using MongoDB.
• Secure token-based authentication with cookies.
Technologies Used
Frontend:
• React.js
• Tailwind CSS
Backend:
• Node.js
• Express.js
• MongoDB
Others:
• JWT for authentication.
• React Hot Toast for notifications.

Installation
Prerequisites
• Node.js installed on your machine.
• MongoDB instance (local or cloud).
Steps

1. Clone the repository:
2. git clone https://github.com/yourusername/todo-app.git
3. cd todo-app
4. Install dependencies for the backend:
5. cd backend
6. npm install
7. Create a .env file in the backend directory and add the following variables:
8. PORT=4001
9. MONGODB_URI=your_mongodb_connection_string
10. JWT_SECRET_KEY=your_secret_key
11. FRONTEND_URL=http://localhost:3000
12. Start the backend server:
13. npm start
14. Install dependencies for the frontend:
15. cd ../frontend
16. npm install
17. Start the frontend development server:
18. npm run dev
    Usage
19. Open your browser and navigate to http://localhost:5173.
20. Register or log in to access your tasks.
21. Use the input field to add new tasks.
22. Edit or delete tasks using the respective buttons.
23. Toggle the completion status of tasks by clicking the checkbox.
