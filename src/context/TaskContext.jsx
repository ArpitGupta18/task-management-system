import { createContext, useContext, useState } from "react";
import { ThemeProvider } from "./ThemeContext";

export const TaskContext = createContext();

let taskId = 1;
let projectId = 1;

const initialTasks = [
	{
		id: taskId++,
		name: "Task 1",
		description: "Description 1",
		dueDate: "2024-08-15",
		priority: "Low",
		status: "To Do",
		projectId: "1",
	},
	{
		id: taskId++,
		name: "Task 2",
		description: "Description 2",
		dueDate: "2024-08-15",
		priority: "Medium",
		status: "In Progress",
		projectId: "1",
	},
	{
		id: taskId++,
		name: "Task 3",
		description: "Description 3",
		dueDate: "2024-08-15",
		priority: "High",
		status: "Completed",
		projectId: "",
	},
];

const initialProjects = [
	{
		id: projectId++,
		name: "Fire",
		description: "Description 1",
	},
];

export const TaskProvider = ({ children }) => {
	const [tasks, setTasks] = useState(initialTasks);
	const [projects, setProjects] = useState(initialProjects);

	const addTask = (task) => {
		setTasks([...tasks, { ...task, id: taskId++ }]);
	};

	const editTask = (task) => {
		setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
	};

	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	const addProject = (project) => {
		setProjects([...projects, { ...project, id: projectId++ }]);
	};

	const editProject = (project) => {
		setProjects(projects.map((p) => (p.id === project.id ? project : p)));
	};

	const deleteProject = (id) => {
		setProjects(projects.filter((project) => project.id !== id));
	};

	const deleteTasksByProject = (id) => {
		setTasks((tasks) =>
			tasks.filter((task) => Number(task.projectId) !== Number(id))
		);
	};

	const matchProjectId = (id) => {
		const match = projects.filter(
			(project) => Number(project.id) === Number(id)
		);
		if (match.length < 1) {
			return "No Project";
		}

		return match[0].name;
	};

	return (
		<ThemeProvider>
			<TaskContext.Provider
				value={{
					tasks,
					projects,
					setProjects,
					setTasks,
					addTask,
					editTask,
					deleteTask,
					addProject,
					editProject,
					deleteProject,
					matchProjectId,
					deleteTasksByProject,
				}}
			>
				{children}
			</TaskContext.Provider>
		</ThemeProvider>
	);
};

export const useTasks = () => useContext(TaskContext);
