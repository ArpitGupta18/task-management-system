import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { useTasks } from "../../context/TaskContext";
import styles from "./TaskList.module.css";

const TaskList = () => {
	const { tasks, addTask, editTask, deleteTask, matchProjectId } = useTasks();
	const [editingTask, setEditingTask] = useState(null);
	const [filter, setFilter] = useState("");

	const handleAddTask = (task) => {
		addTask(task);
	};

	const handleEditTask = (task) => {
		editTask(task);
		setEditingTask(null);
	};

	const handleDeleteTask = (id) => {
		if (window.confirm("Are you sure you want to delete this task?")) {
			deleteTask(id);
		}
	};

	const filteredTask = tasks.filter((task) =>
		task.name.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<div className={styles.taskListContainer}>
			<div className={styles.taskFormWrapper}>
				<TaskForm
					onSave={editingTask ? handleEditTask : handleAddTask}
					task={editingTask}
				/>
			</div>
			<div className={styles.taskListWrapper}>
				<h1>Tasks List</h1>
				<input
					type="text"
					placeholder="Search tasks"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className={styles.searchInput}
				/>
				<ul className={styles.taskList}>
					{filteredTask.map((task) => (
						<li key={task.id} className={styles.taskItem}>
							<h2>{task.name}</h2>
							<p>{task.description}</p>
							<p>Due Date: {task.dueDate}</p>
							<p>Priority: {task.priority}</p>
							<p>Status: {task.status}</p>
							<p>Project: {matchProjectId(task.projectId)}</p>
							<button
								onClick={() => {
									setEditingTask(task);
									window.scrollTo({
										top: 0,
										behavior: "smooth",
									});
								}}
								className={styles.editButton}
							>
								Edit
							</button>
							<button
								onClick={() => handleDeleteTask(task.id)}
								className={styles.deleteButton}
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default TaskList;
