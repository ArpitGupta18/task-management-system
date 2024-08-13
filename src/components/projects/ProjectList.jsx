import React, { useState } from "react";
import ProjectForm from "./ProjectForm";
import ProjectTasks from "./ProjectTasks";
import { useTasks } from "../../context/TaskContext";
import styles from "./ProjectList.module.css";

const ProjectList = () => {
	const {
		projects,
		addProject,
		editProject,
		deleteProject,
		deleteTasksByProject,
	} = useTasks();
	const [editingProject, setEditingProject] = useState(null);
	const [visibleProjectId, setVisibleProjectId] = useState(null);

	const handleAddProject = (project) => {
		addProject(project);
	};

	const handleEditProject = (project) => {
		editProject(project);
		setEditingProject(null);
	};

	const handleDeleteProject = (id) => {
		if (window.confirm("Are you sure you want to delete this project?")) {
			deleteTasksByProject(id);
			deleteProject(id);
		}
	};

	const toggleProjectTasks = (id) => {
		setVisibleProjectId(visibleProjectId === id ? null : id);
	};

	return (
		<div className={styles.projectListContainer}>
			<div className={styles.projectFormWrapper}>
				<ProjectForm
					onSave={
						editingProject ? handleEditProject : handleAddProject
					}
					project={editingProject}
				/>
			</div>

			<div className={styles.projectList}>
				<h1>Projects List</h1>
				<ul className={styles.projects}>
					{projects.map((project) => (
						<li key={project.id} className={styles.projectItem}>
							<h2 className={styles.projectName}>
								{project.name}
							</h2>
							<p className={styles.projectDescription}>
								{project.description}
							</p>
							<button
								onClick={() => setEditingProject(project)}
								className={`${styles.projectButton} ${styles.editButton}`}
							>
								Edit
							</button>
							<button
								onClick={() => handleDeleteProject(project.id)}
								className={`${styles.projectButton} ${styles.deleteButton}`}
							>
								Delete
							</button>
							<button
								onClick={() => toggleProjectTasks(project.id)}
								className={`${styles.projectButton} ${styles.toggleTasksButton}`}
							>
								{visibleProjectId === project.id
									? "Hide Tasks"
									: "View Tasks"}
							</button>

							{visibleProjectId === project.id && (
								<ProjectTasks
									projectId={project.id}
									projectName={project.name}
								/>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ProjectList;
