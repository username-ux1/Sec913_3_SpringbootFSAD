import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {

    const navigate = useNavigate();

    const [activePage, setActivePage] = useState("dashboard");

    const [roleName, setRoleName] = useState("");
    const [roles, setRoles] = useState([]);

    const [task, setTask] = useState("");
    const [desc, setDesc] = useState("");
    const [tasks, setTasks] = useState([]);

    const [users, setUsers] = useState([]);

    // MENU MAPPING STATES
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedMenu, setSelectedMenu] = useState("");

    // TASK FORM EXTRA STATES
    const [assignTo, setAssignTo] = useState("");
    const [taskRole, setTaskRole] = useState("");
    const [dueDate, setDueDate] = useState("");

    const username = localStorage.getItem("username");

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    const addRole = async () => {
        try {
            if (roleName.trim() === "") {
                alert("Please enter role");
                return;
            }

            const response = await fetch(
                `http://localhost:8000/authservice/addrole?rolename=${roleName}`,
                {
                    method: "POST"
                }
            );

            const data = await response.json();
            alert(data.message);

            setRoleName("");
            listRoles();

        } catch (error) {
            alert(error);
        }
    };

    const listRoles = async () => {
        try {
            const response = await fetch("http://localhost:8000/authservice/listroles");
            const data = await response.json();

            if (data.code === 200) {
                setRoles(data.roles);
            }
        } catch (error) {
            alert(error);
        }
    };

    const addTask = async () => {
        try {
            if (task.trim() === "" || desc.trim() === "") {
                alert("Please enter task and description");
                return;
            }

            const response = await fetch("http://localhost:8000/authservice/addtask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    task: task,
                    desc: desc
                })
            });

            const data = await response.json();
            alert(data.message);

            setTask("");
            setDesc("");
            setAssignTo("");
            setTaskRole("");
            setDueDate("");

            listTasks();

        } catch (error) {
            alert(error);
        }
    };

    const listTasks = async () => {
        try {
            const response = await fetch("http://localhost:8000/authservice/listtasks");
            const data = await response.json();

            if (data.code === 200) {
                setTasks(data.tasks);
            }
        } catch (error) {
            alert(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/authservice/deletetask/${id}`, {
                method: "DELETE"
            });

            const data = await response.json();
            alert(data.message);

            listTasks();

        } catch (error) {
            alert(error);
        }
    };

    const listUsers = async () => {
        try {
            const response = await fetch("http://localhost:8000/authservice/listusers");
            const data = await response.json();

            if (data.code === 200) {
                setUsers(data.users);
            }
        } catch (error) {
            alert(error);
        }
    };

    // MAP MENU WITH ROLE FUNCTION
    const mapMenu = async () => {
        try {
            if (selectedRole === "" || selectedMenu === "") {
                alert("Please select role and menu");
                return;
            }

            const response = await fetch(
                `http://localhost:8000/authservice/mapmenu?role=${selectedRole}&mid=${selectedMenu}`,
                {
                    method: "POST"
                }
            );

            const data = await response.json();
            alert(data.message);

            setSelectedRole("");
            setSelectedMenu("");

        } catch (error) {
            alert(error);
        }
    };

    const resetTaskForm = () => {
        setTask("");
        setDesc("");
        setAssignTo("");
        setTaskRole("");
        setDueDate("");
    };

    useEffect(() => {
        listRoles();
        listTasks();
        listUsers();
    }, []);

    return (
        <div className="home-container">

            {/* HEADER */}
            <div className="topbar">

                <div className="logo-section">
                    <img src="http://localhost:5173/logo.png" alt="" />
                    <h2>Micro-Task Hub</h2>
                </div>

                <div className="user-section">
                    <span>{username}</span>
                    <button className="logout-btn" onClick={logout}>⏻</button>
                </div>

            </div>

            {/* BODY */}
            <div className="main-layout">

                {/* SIDEBAR */}
                <div className="sidebar">

                    <ul>
                        <li
                            className={activePage === "dashboard" ? "active" : ""}
                            onClick={() => setActivePage("dashboard")}
                        >
                            🏠 Dashboard
                        </li>

                        <li
                            className={activePage === "mytask" ? "active" : ""}
                            onClick={() => setActivePage("mytask")}
                        >
                            📋 My Task
                        </li>

                        <li
                            className={activePage === "taskmanager" ? "active" : ""}
                            onClick={() => setActivePage("taskmanager")}
                        >
                            ⚙️ Task Manager
                        </li>

                        <li
                            className={activePage === "usermanager" ? "active" : ""}
                            onClick={() => setActivePage("usermanager")}
                        >
                            👥 User Manager
                        </li>

                        <li
                            className={activePage === "profile" ? "active" : ""}
                            onClick={() => setActivePage("profile")}
                        >
                            👤 My Profile
                        </li>

                        <li
                            className={activePage === "roles" ? "active role-text" : "role-text"}
                            onClick={() => setActivePage("roles")}
                        >
                            🛡️ Role Manager
                        </li>
                    </ul>

                </div>

                {/* CONTENT */}
                <div className="content-area">

                    {/* DASHBOARD PAGE */}
                    {
                        activePage === "dashboard" && (
                            <div className="card">
                                <h3>Dashboard</h3>
                                <p>Welcome to Micro-Task Hub.</p>
                                <p>Select any option from sidebar to manage tasks, users, and roles.</p>
                            </div>
                        )
                    }

                    {/* MY TASK PAGE */}
                    {
                        activePage === "mytask" && (
                            <div className="card">
                                <h3>My Task</h3>

                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Task</th>
                                            <th>Task Description</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            tasks.length === 0 ? (
                                                <tr>
                                                    <td colSpan="3">No tasks available</td>
                                                </tr>
                                            ) : (
                                                tasks.map((t, index) => (
                                                    <tr key={t.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{t.task}</td>
                                                        <td>{t.desc}</td>
                                                    </tr>
                                                ))
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }

                    {/* TASK MANAGER PAGE */}
                    {
                        activePage === "taskmanager" && (
                            <div className="task-page">

                                <div className="task-form-card">
                                    <h3>Create Task</h3>

                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Update Q2 invoice template"
                                            value={task}
                                            onChange={(e) => setTask(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            placeholder="Optional details"
                                            value={desc}
                                            onChange={(e) => setDesc(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Assign To</label>
                                            <select
                                                value={assignTo}
                                                onChange={(e) => setAssignTo(e.target.value)}
                                            >
                                                <option value="">A role</option>
                                                {
                                                    users.map((u) => (
                                                        <option key={u.id} value={u.id}>
                                                            {u.email}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Role*</label>
                                            <select
                                                value={taskRole}
                                                onChange={(e) => setTaskRole(e.target.value)}
                                            >
                                                <option value="">Select...</option>
                                                {
                                                    roles.map((r) => (
                                                        <option key={r.role} value={r.role}>
                                                            {r.rolename}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group half-width">
                                        <label>Due Date</label>
                                        <input
                                            type="date"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-actions">
                                        <button className="reset-btn" onClick={resetTaskForm}>
                                            Reset
                                        </button>

                                        <button className="create-btn" onClick={addTask}>
                                            Create Task
                                        </button>
                                    </div>
                                </div>

                                <div className="task-list-card">
                                    <h3>All Tasks</h3>

                                    <table className="clean-task-table">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Assignee</th>
                                                <th>Due</th>
                                                <th>Created</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                tasks.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="5">No tasks available</td>
                                                    </tr>
                                                ) : (
                                                    tasks.map((t) => (
                                                        <tr key={t.id}>
                                                            <td>
                                                                <b>{t.task}</b>
                                                                <p>{t.desc}</p>
                                                            </td>

                                                            <td>
                                                                <span className="role-pill">ROLE</span>
                                                                Manager
                                                            </td>

                                                            <td>--</td>

                                                            <td>{new Date().toLocaleString()}</td>

                                                            <td>
                                                                <button
                                                                    className="delete-clean-btn"
                                                                    onClick={() => deleteTask(t.id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        )
                    }

                    {/* USER MANAGER PAGE */}
                    {
                        activePage === "usermanager" && (
                            <div className="card">
                                <h3>User Manager</h3>

                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            users.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4">No users available</td>
                                                </tr>
                                            ) : (
                                                users.map((u) => (
                                                    <tr key={u.id}>
                                                        <td>{u.id}</td>
                                                        <td>{u.email}</td>
                                                        <td>{u.role}</td>
                                                        <td>{u.status}</td>
                                                    </tr>
                                                ))
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }

                    {/* PROFILE PAGE */}
                    {
                        activePage === "profile" && (
                            <div className="card">
                                <h3>My Profile</h3>
                                <p>Username: {username}</p>
                            </div>
                        )
                    }

                    {/* ROLE MANAGER PAGE */}
                    {
                        activePage === "roles" && (
                            <>
                                <div className="card">
                                    <h3>Role Manager</h3>

                                    <div className="input-row">
                                        <input
                                            type="text"
                                            placeholder="Enter role"
                                            value={roleName}
                                            onChange={(e) => setRoleName(e.target.value)}
                                        />

                                        <button onClick={addRole}>Add Role</button>
                                    </div>

                                    <h3 style={{ marginTop: "25px" }}>Available Roles</h3>

                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Role ID</th>
                                                <th>Role Name</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                roles.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="2">No roles available</td>
                                                    </tr>
                                                ) : (
                                                    roles.map((r) => (
                                                        <tr key={r.role}>
                                                            <td>{r.role}</td>
                                                            <td>{r.rolename}</td>
                                                        </tr>
                                                    ))
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="card">
                                    <h3>Map Menu with Roles</h3>

                                    <div className="map-container">

                                        <div className="left-side">
                                            <select
                                                value={selectedRole}
                                                onChange={(e) => setSelectedRole(e.target.value)}
                                            >
                                                <option value="">Select Role</option>
                                                {
                                                    roles.map((r) => (
                                                        <option key={r.role} value={r.role}>
                                                            {r.rolename}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="right-side">

                                            <select
                                                value={selectedMenu}
                                                onChange={(e) => setSelectedMenu(e.target.value)}
                                            >
                                                <option value="">Select Menu</option>
                                                <option value="1">MyTask</option>
                                                <option value="2">Task Manager</option>
                                                <option value="3">User Manager</option>
                                                <option value="4">Role Manager</option>
                                                <option value="5">My Profile</option>
                                                <option value="6">Report</option>
                                            </select>

                                            <button onClick={mapMenu}>Add Mapping</button>

                                        </div>

                                    </div>
                                </div>
                            </>
                        )
                    }

                </div>

            </div>

        </div>
    );
};

export default Home;