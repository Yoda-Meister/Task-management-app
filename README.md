## Task Management App with React, TypeScript, and TailwindCSS

This project is a single-page React application built with TypeScript and TailwindCSS, allowing users to manage a list of tasks.

**Features:**

- **Task List Display:** Renders a list of tasks with titles, completion status, and optional search results.
- **Add Task:** Enables adding new tasks with input validation to prevent empty entries.
- **Toggle Task Status:** Allows users to mark tasks as completed or pending by clicking on them. The UI visually reflects the task status.
- **Filter Tasks:** Provides options to filter tasks by all, completed, and pending tasks.
- **Delete Task:** Offers functionality to delete tasks from the list.
- **Search Feature:** Allows users to search for tasks by title using a search bar.
- **Sort by Name/Date:** Provides options to sort the task list alphabetically by title or chronologically by creation date.
- **Dark Mode:** Offers a toggle to switch between light and dark themes for the application's user interface.
- **WIP Arabic Translation:** The application is currently under development for Arabic translation (Work in Progress).

**Getting Started:**

1. **Clone the repository:** `git clone [Task Management App](https://github.com/Yoda-Meister/task-management-app.git)`
2. **Install dependencies:** `npm install`
3. **Start the development server:** `npm run start`
4. **Open [http://localhost:3000](http://localhost:3000) to view it in the browser.**

**Technology Stack:**

- ReactJS: Frontend library for building user interfaces.
- TypeScript: Superset of JavaScript that adds static typing for improved code safety and maintainability.
- TailwindCSS: Utility-first CSS framework for rapid and responsive UI development.

**How it Works:**

The application utilizes React components to structure the user interface.

- **TaskList component:** Renders the list of tasks with titles, completion status, applies search filters, sorting logic, and handles filter selections.
- **TaskItem component:** Represents an individual task with status regarding creation date and time passed since creation.
- **Add task functionality:** Handles user input for new tasks, validates entries, and adds them to the task list.
- **Toggle task status:** Updates the task status (completed/pending) based on user interaction and reflects the change in the UI.
- **Filter Tasks:** Provides tabs to filter the task list by all, completed, and pending tasks.
- **Delete task functionality:** Allows users to remove tasks from the list.
- **Search Feature:** Implements a search bar component that filters the task list based on user input.
- **Sort by Name/Date:** Provides a dropdown menus to sort the task list alphabetically by title or chronologically by creation date.
- **Dark Mode:** Utilizes a TailwindCSS directives to toggle between light and dark themes for the UI.
- **WIP Arabic Translation:** The application is under development to include Arabic language support for UI elements and potentially task content.

