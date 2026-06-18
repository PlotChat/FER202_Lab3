import { useCallback, useContext, useMemo, useReducer, useState } from "react";
import { ModeContext } from "../context/ModeContext";
import styles from "./assets/StudentManagement.module.css";

const StudentManagement = () => {
	const { toggleMode, isDark } = useContext(ModeContext);

	const [studentInfo, setStudentInfo] = useState({
		id: null,
		name: "",
		age: "",
		major: "",
	});
	const [searchTerm, setSearchTerm] = useState("");
	const [filterTerm, setFilterTerm] = useState("");

	const initialStudents = [
		{ id: "123456", name: "Loan Do", age: "18", major: "IT" },
		{ id: "789", name: "Khiem Vu", age: "20", major: "Business" },
	];

	const reducer = (state, action) => {
		switch (action.type) {
			case "ADD_STUDENT":
				return [...state, action.payload];
			case "DELETE_STUDENT":
				return state.filter((s) => s.id !== action.payload);
			case "UPDATE_STUDENT":
				return [...state, action.payload];
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, initialStudents);

	const addStudent = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const id = studentInfo.id ? studentInfo.id : crypto.randomUUID();
		const name = formData.get("name");
		const age = formData.get("age");
		const major = formData.get("major");

		dispatch({ type: "ADD_STUDENT", payload: { id, name, age, major } });
		setStudentInfo({ id: null, name: "", age: "", major: "" });
		e.currentTarget.reset();
	};

	const deleteStudent = useCallback((id) => {
		dispatch({ type: "DELETE_STUDENT", payload: id });
	}, []);

	const updateStudent = ({ id, name, age, major }) => {
		deleteStudent(id);
		setStudentInfo({ id, name, age, major });
		dispatch({ type: "UPDATE_STUDENT", payload: { id, name, age, major } });
	};

	const displayedStudents = useMemo(() => state.filter(
		(s) =>
			s.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			s.major.toLowerCase().includes(filterTerm.toLowerCase()),
	), [filterTerm, searchTerm, state]);

	return (
		<div>
			<h1>Student Management</h1>
			<button onClick={toggleMode}>
				{isDark ? "Light Mode" : "Dark Mode"}
			</button>
			<form onSubmit={addStudent} className={styles.form}>
				<div>
					{studentInfo.id && (
						<input type="hidden" value={studentInfo.id} name="id" />
					)}
					<input
						placeholder="name"
						defaultValue={studentInfo.name}
						name="name"
						type="text"
						required
					/>
					<input
						placeholder="age"
						defaultValue={studentInfo.age}
						name="age"
						type="text"
						required
					/>
					<input
						placeholder="major"
						defaultValue={studentInfo.major}
						name="major"
						type="text"
						required
					/>
					<button type="submit">
						{studentInfo.id ? "Update Student" : "Add Student"}
					</button>
				</div>
			</form>

			<div className={styles.form}>
				<input
					placeholder="Search Student..."
					onChange={(e) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<select onChange={(e) => setFilterTerm(e.target.value)}>
					<option value="">All Majors</option>
					<option value="IT">IT</option>
					<option value="Business">Business</option>
				</select>
			</div>

			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Age</th>
						<th>Major</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{displayedStudents.map((s) => (
						<tr key={s.id}>
							<td>{s.id}</td>
							<td>{s.name}</td>
							<td>{s.age}</td>
							<td>{s.major}</td>
							<td>
								<button
									onClick={() =>
										updateStudent({
											id: s.id,
											name: s.name,
											age: s.age,
											major: s.major,
										})
									}
								>
									Edit
								</button>
								<button onClick={() => deleteStudent(s.id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<h3>Total Students: {displayedStudents.length}</h3>
		</div>
	);
};

export default StudentManagement;
