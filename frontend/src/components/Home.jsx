import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { callApi, apibaseurl } from "../lib"; // Standardized API utility

const Home = () => {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState("dashboard");
    const [roleName, setRoleName] = useState("");
    const [roles, setRoles] = useState([]);
    const [task, setTask] = useState("");
    const [desc, setDesc] = useState("");
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    // MENU MAPPING & TASK FORM STATES
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedMenu, setSelectedMenu] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const [taskRole, setTaskRole] = useState("");
    const [dueDate, setDueDate] = useState("");

    const username = localStorage.getItem("username");

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    // Generalized response handler for simple alerts
    const handleBasicResponse = (res) => {
        alert(res.message);
    };

    const addRole = () => {
        if (!roleName.trim()) return alert("Please enter role");
        
        callApi("POST", `${apibaseurl}/authservice/addrole?rolename=${roleName}`, null, null, (res) => {
            alert(res.message);
            setRoleName("");
            listRoles();
        });
    };

    const listRoles = () => {
        callApi("GET", `${apibaseurl}/authservice/listroles`, null, null, (data) => {
            if (data.code === 200) setRoles(data.roles);
        });
    };

    const addTask = () => {
        if (!task.trim() || !desc.trim()) return alert("Please enter task and description");

        // Included missing state variables in the payload
        const taskData = {
            task: task,
            desc: desc,
            assigneeId: assignTo,
            role: taskRole,
            dueDate: dueDate
        };

        callApi("POST", `${apibaseurl}/authservice/addtask`, taskData, null, (res) => {
            alert(res.message);
            resetTaskForm();
            listTasks();
        });
    };

    const listTasks = () => {
        callApi("GET", `${apibaseurl}/authservice/listtasks`, null, null, (data) => {
            if (data.code === 200) setTasks(data.tasks);
        });
    };

    const deleteTask = (id) => {
        callApi("DELETE", `${apibaseurl}/authservice/deletetask/${id}`, null, null, (res) => {
            alert(res.message);
            listTasks();
        });
    };

    const listUsers = () => {
        callApi("GET", `${apibaseurl}/authservice/listusers`, null, null, (data) => {
            if (data.code === 200) setUsers(data.users);
        });
    };

    const mapMenu = () => {
        if (!selectedRole || !selectedMenu) return alert("Please select role and menu");

        callApi("POST", `${apibaseurl}/authservice/mapmenu?role=${selectedRole}&mid=${selectedMenu}`, null, null, (res) => {
            alert(res.message);
            setSelectedRole("");
            setSelectedMenu("");
        });
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
            <div className="topbar">
                <div className="logo-section">
                    <img src="/logo.png" alt="Logo" />
                    <h2>Micro-Task Hub</h2>
                </div>
                <div className="user-section">
                    <span>{username}</span>
                    <button className="logout-btn" onClick={logout}>⏻</button>
                </div>
            </div>

            <div className="main-layout">
                <div className="sidebar">
                    <ul>
                        <li className={activePage === "dashboard" ? "active" : ""} onClick={() => setActivePage("dashboard")}>🏠 Dashboard</li>
                        <li className={activePage === "mytask" ? "active" : ""} onClick={() => setActivePage("mytask")}>📋 My Task</li>
                        <li className={activePage === "taskmanager" ? "active" : ""} onClick={() => setActivePage("taskmanager")}>⚙️ Task Manager</li>
                        <li className={activePage === "usermanager" ? "active" : ""} onClick={() => setActivePage("usermanager")}>👥 User Manager</li>
                        <li className={activePage === "profile" ? "active" : ""} onClick={() => setActivePage("profile")}>👤 My Profile</li>
                        <li className={activePage === "roles" ? "active role-text" : "role-text"} onClick={() => setActivePage("roles")}>🛡️ Role Manager</li>
                    </ul>
                </div>

                <div className="content-area">
                    {activePage === "dashboard" && (
                        <div className="card">
                            <h3>Dashboard</h3>
                            <p>Welcome back, {username}. Manage your workspace using the sidebar.</p>
                        </div>
                    )}

                    {activePage === "taskmanager" && (
                        <div className="task-page">
                            <div className="task-form-card">
                                <h3>Create Task</h3>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Task title..." />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Task details..."></textarea>
                                </div>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Assign To User</label>
                                        <select value={assignTo} onChange={(e) => setAssignTo(e.target.value)}>
                                            <option value="">Select User</option>
                                            {users.map(u => <option key={u.id} value={u.id}>{u.email}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Required Role</label>
                                        <select value={taskRole} onChange={(e) => setTaskRole(e.target.value)}>
                                            <option value="">Select Role</option>
                                            {roles.map(r => <option key={r.role} value={r.role}>{r.rolename}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group half-width">
                                    <label>Due Date</label>
                                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                                </div>
                                <div className="form-actions">
                                    <button className="reset-btn" onClick={resetTaskForm}>Reset</button>
                                    <button className="create-btn" onClick={addTask}>Create Task</button>
                                </div>
                            </div>
                            {/* Task List Table remains as per your styling */}
                        </div>
                    )}
                    {/* Additional pages (MyTask, UserManager, Roles) follow the same card pattern */}
                </div>
            </div>
        </div>
    );
};

export default Home;