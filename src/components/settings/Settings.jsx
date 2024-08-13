import React from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Settings.module.css";

const Settings = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div>
			<button onClick={toggleTheme} className={styles.toggleButton}>
				Switch to {theme === "light" ? "Dark" : "Light"} Mode
			</button>
		</div>
	);
};

export default Settings;
