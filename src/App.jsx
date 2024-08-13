import "./App.css";
import Navbar from "./components/Navbar";
import { TaskProvider } from "./context/TaskContext";

function App() {
	return (
		<>
			<TaskProvider>
				<Navbar />
			</TaskProvider>
		</>
	);
}

export default App;
