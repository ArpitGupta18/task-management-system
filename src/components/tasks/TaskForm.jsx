import React, { useState, useEffect } from "react";
import { useTasks } from "../../context/TaskContext";
import styles from "./TaskForm.module.css";

const TaskForm = ({ onSave, task }) => {
	const { projects } = useTasks();
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		dueDate: "",
		priority: "Low",
		status: "To Do",
		projectId: "",
	});

	useEffect(() => {
		if (task) {
			setFormData(task);
		}
	}, [task]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
		setFormData({
			name: "",
			description: "",
			dueDate: "",
			priority: "Low",
			status: "To Do",
			projectId: "",
		});
	};

	return (
		<form onSubmit={handleSubmit} className={styles.taskForm}>
			<h2 className={styles.formTitle}>
				{task ? "Edit Task" : "Add Task"}
			</h2>

			<input
				type="text"
				name="name"
				value={formData.name}
				onChange={handleChange}
				placeholder="Task Name"
				className={styles.input}
				required
			/>
			<textarea
				name="description"
				value={formData.description}
				onChange={handleChange}
				placeholder="Description"
				className={styles.textarea}
			/>
			<input
				type="date"
				name="dueDate"
				value={formData.dueDate}
				onChange={handleChange}
				className={styles.input}
			/>
			<select
				name="status"
				value={formData.status}
				onChange={handleChange}
				className={styles.select}
			>
				<option value="To Do">To Do</option>
				<option value="In Progress">In Progress</option>
				<option value="Completed">Completed</option>
			</select>
			<select
				name="priority"
				value={formData.priority}
				onChange={handleChange}
				className={styles.select}
			>
				<option value="Low">Low</option>
				<option value="Medium">Medium</option>
				<option value="High">High</option>
			</select>
			<select
				name="projectId"
				value={formData.projectId}
				onChange={handleChange}
				className={styles.select}
			>
				<option value="">No Project</option>
				{projects.map((project) => (
					<option value={project.id} key={project.id}>
						{project.name}
					</option>
				))}
			</select>
			<button type="submit" className={styles.submitButton}>
				Save
			</button>
		</form>
	);
};

export default TaskForm;
