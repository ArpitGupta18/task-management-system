import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import TasksPage from "../pages/TasksPage";
import ProjectsPage from "../pages/ProjectsPage";
import SettingsPage from "../pages/SettingsPage";
import styles from "./Navbar.module.css";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const navRef = useRef(null);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const handleClickOutside = (event) => {
		if (navRef.current && !navRef.current.contains(event.target)) {
			setMenuOpen(false);
		}
	};

	const handleLinkClick = () => {
		setMenuOpen(false);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<Router>
			<header className={styles.navBar} ref={navRef}>
				<div className={styles.navLogo}>TaskZen</div>
				<nav>
					<div className={styles.hamburger} onClick={toggleMenu}>
						<span className={styles.bar}></span>
						<span className={styles.bar}></span>
						<span className={styles.bar}></span>
					</div>
					<ul
						className={`${styles.navBarList} ${
							menuOpen ? styles.showMenu : ""
						}`}
					>
						<li className={styles.navBarItem}>
							<Link
								to="/"
								className={styles.navBarLink}
								onClick={handleLinkClick}
							>
								Dashboard
							</Link>
						</li>
						<li className={styles.navBarItem}>
							<Link
								to="/tasks"
								className={styles.navBarLink}
								onClick={handleLinkClick}
							>
								Tasks
							</Link>
						</li>
						<li className={styles.navBarItem}>
							<Link
								to="/projects"
								className={styles.navBarLink}
								onClick={handleLinkClick}
							>
								Projects
							</Link>
						</li>
						<li className={styles.navBarItem}>
							<Link
								to="/settings"
								className={styles.navBarLink}
								onClick={handleLinkClick}
							>
								Settings
							</Link>
						</li>
					</ul>
				</nav>
			</header>

			<main className="main-content">
				<Routes>
					<Route path="/" element={<DashboardPage />} />
					<Route path="/tasks" element={<TasksPage />} />
					<Route path="/projects" element={<ProjectsPage />} />
					<Route path="/settings" element={<SettingsPage />} />
				</Routes>
			</main>
		</Router>
	);
};

export default Navbar;
