import { useContext } from "react";
import StudentManagement from "./components/StudentManagement";
import { ModeContext } from "./context/ModeContext";

const App = () => {
	const { modeStyles } = useContext(ModeContext);

	return (
		<div
			style={{
				backgroundColor: modeStyles.primary,
				color: modeStyles.secondary,
				borderColor: modeStyles.primary,
				display: "flex",
				justifyContent: "center",
				padding: "2rem",
			}}
		>
			<StudentManagement></StudentManagement>
		</div>
	);
};

export default App;
