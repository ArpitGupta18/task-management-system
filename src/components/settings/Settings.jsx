import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Settings = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<div>
			<button onClick={toggleTheme}>
				Switch to {theme === "light" ? "Dark" : "Light"} Mode
			</button>
		</div>
	);
};

export default Settings;
