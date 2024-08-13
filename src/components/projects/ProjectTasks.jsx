import React from "react";
import { useTasks } from "../../context/TaskContext";
import styles from "./ProjectTasks.module.css";

const ProjectTasks = ({ projectId, projectName }) => {
	const { tasks } = useTasks();

	const projectTasks = tasks.filter(
		(task) => Number(task.projectId) === projectId
	);

	return (
		<div className={styles.projectTasksContainer}>
			{projectTasks.length > 0 ? (
				<ul className={styles.taskList}>
					{projectTasks.map((task) => (
						<li key={task.id} className={styles.taskItem}>
							<h4 className={styles.taskTitle}>{task.name}</h4>
							<p className={styles.taskDescription}>
								{task.description}
							</p>
							<div className={styles.taskDetails}>
								<p>
									<strong>Due Date:</strong> {task.dueDate}
								</p>
								<p>
									<strong>Priority:</strong> {task.priority}
								</p>
								<p>
									<strong>Status:</strong> {task.status}
								</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className={styles.noTasksMessage}>
					No tasks for this project.
				</p>
			)}
		</div>
	);
};

export default ProjectTasks;
