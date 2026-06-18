import { useCallback, useContext, useReducer, useState } from "react";
import { ModeContext } from "../context/ModeContext";
import styles from "./assets/StudentManagement.module.css";

const StudentManagement = () => {
	const { toggleMode, isDark } = useContext(ModeContext);

	const [ studentInfo, setStudentInfo ] = useState({id: null});

	const initialStudents = [
		{ id: "123456", name: "Loan Do", age: "18", major: "IT" },
		{ id: "789", name: "Khiem Vu", age: "20", major: "Business" },
	];
	const reducer = (state, action) => {
		switch (action.type) {
			case "ADD_STUDENT":
				return [...state, action.payload];
			case "DELETE_STUDENT":
				return state.filter((s, i) => i != action.payload);
			case "UPDATE_STUDENT":
				return [...state, action.payload];
            case "SEARCH":
                return state.filter((s) => s.name.includes(action.payload));
		}
	};
	const [state, dispatch] = useReducer(reducer, initialStudents);

	const addStudent = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		let id;
		if (!studentInfo.id) {
			id = studentInfo.id;
		} else {
			id = crypto.randomUUID();
		}

		const name = formData.get("name");
		const age = formData.get("age");
		const major = formData.get("major");

		dispatch({ type: "ADD_STUDENT", payload: { id, name, age, major } });
		e.currentTarget.reset();
	};

	const deleteStudent = useCallback((index) => {
		dispatch({ type: "DELETE_STUDENT", payload: index });
	}, []);

	const updateStudent = ({ id, name, age, major }, index) => {
        deleteStudent(index);
        setStudentInfo({id, name, age, major})
        dispatch({type: "UPDATE_STUDENT", payload: {id, name, age, major}})
    };

    const search = (e) => {
        e.preventDefault();
        dispatch({type: "SEARCH", payload: e.currentTarget.value})
    }

	return (
		<div>
			<h1>Student Management</h1>
			<button onClick={toggleMode}>
				{isDark ? "Light Mode" : "Dark Mode"}
			</button>
			<form onSubmit={(e) => addStudent(e)} className="form">
				<div>
                    {studentInfo.id && (
                        <hidden value={studentInfo.id} name="id"></hidden>
                    )}
					<input
						placeholder={"name"}
						value={studentInfo.name}
						name="name"
						type="text"
					></input>
					<input
						placeholder={"age"}
						value={studentInfo.age}
						type="text"
					></input>
					<input
						placeholder={"major"}
						value={studentInfo.major}
						type="text"
					></input>
					<button type="submit">Add Student</button>
				</div>
			</form>

			<div className="form">
				<input placeholder="Search Student..." onChange={(e) => search(e)}></input>
				<select>
					<option>All Majors</option>
					<option>IT</option>
					<option>Business</option>
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
					{state.map((s, index) => (
						<tr key={crypto.randomUUID()}>
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
										}, index)
									}
								>
									Edit
								</button>
								<button onClick={() => deleteStudent(index)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<h3>Total Students: {state.length}</h3>
		</div>
	);
};

export default StudentManagement;
