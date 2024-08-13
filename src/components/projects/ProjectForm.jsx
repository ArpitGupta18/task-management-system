import React, { useEffect, useState } from "react";
import styles from "./ProjectForm.module.css";

const ProjectForm = ({ onSave, project }) => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
	});

	useEffect(() => {
		if (project) {
			setFormData(project);
		}
	}, [project]);

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
		});
	};

	return (
		<form onSubmit={handleSubmit} className={styles.projectFormContainer}>
			<h2 className={styles.projectFormHeader}>
				{project ? "Edit Project" : "Add Project"}
			</h2>
			<input
				type="text"
				name="name"
				value={formData.name}
				onChange={handleChange}
				placeholder="Project Name"
				required
				className={styles.projectInput}
			/>
			<textarea
				name="description"
				value={formData.description}
				onChange={handleChange}
				placeholder="Description"
				className={styles.projectTextarea}
			></textarea>
			<button type="submit" className={styles.saveButton}>
				Save
			</button>
		</form>
	);
};

export default ProjectForm;
