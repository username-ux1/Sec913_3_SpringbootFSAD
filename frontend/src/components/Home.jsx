import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { callApi, apibaseurl } from "../lib";

const Home = () => {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState("dashboard");
    
    // Data States
    const [roles, setRoles] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    // Form States
    const [roleName, setRoleName] = useState("");
    const [task, setTask] = useState("");
    const [desc, setDesc] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const [taskRole, setTaskRole] = useState("");
    const [dueDate, setDueDate] = useState("");

    // Mapping States
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    const username = localStorage.getItem("username");

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    // --- API FUNCTIONS ---

    const listRoles = () => {
        callApi("GET", `${apibaseurl}/authservice/listroles`, null, null, (data) => {
            if (data.code === 200) setRoles(data.roles);
        });
    };

    const listTasks = () => {
        callApi("GET", `${apibaseurl}/authservice/listtasks`, null, null, (data) => {
            if (data.code === 200) setTasks(data.tasks);
        });
    };

    const listUsers = () => {
        callApi("GET", `${apibaseurl}/authservice/listusers`, null, null, (data) => {
            if (data.code === 200) setUsers(data.users);
        });
    };

    const addRole = () => {
        if (!roleName.trim()) return alert("Please enter role");
        callApi("POST", `${apibaseurl}/authservice/addrole?rolename=${roleName}`, null, null, (res) => {
            alert(res.message);
            setRoleName("");
            listRoles();
        });
    };

    const addTask = () => {
        if (!task.trim() || !desc.trim()) return alert("Please enter task and description");

        const taskData = {
            task: task,
            desc: desc,
            assigneeId: parseInt(assignTo),
            role: taskRole,
            dueDate: dueDate
        };

        callApi("POST", `${apibaseurl}/authservice/addtask`, taskData, null, (res) => {
            alert(res.message);
            setTask(""); setDesc(""); setAssignTo(""); setTaskRole(""); setDueDate("");
            listTasks();
        });
    };

    const mapUserToRole = () => {
        if (!selectedUser || !selectedRole) return alert("Select user and role");
        
        callApi("POST", `${apibaseurl}/authservice/maprole?uid=${selectedUser}&rid=${selectedRole}`, null, null, (res) => {
            alert(res.message);
            listUsers();
        });
    };

    const deleteTask = (id) => {
        callApi("DELETE", `${apibaseurl}/authservice/deletetask/${id}`, null, null, (res) => {
            alert(res.message);
            listTasks();
        });
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
                    {/* DASHBOARD */}
                    {activePage === "dashboard" && (
                        <div className="card">
                            <h3>Dashboard</h3>
                            <p>Welcome back, <strong>{username}</strong>.</p>
                        </div>
                    )}

                    {/* MY PROFILE (Fixed Section) */}
                    {activePage === "profile" && (
                        <div className="card">
                            <h3>My Profile</h3>
                            <div className="input-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
                                <p><strong>Username/Email:</strong> {username}</p>
                                <p><strong>Status:</strong> <span className="role-pill">Active User</span></p>
                                <p><strong>Access Level:</strong> Standard</p>
                            </div>
                        </div>
                    )}

                    {/* TASK MANAGER */}
                    {activePage === "taskmanager" && (
                        <div className="task-page">
                            <div className="task-form-card">
                                <h3>Create Task</h3>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                                </div>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Assign To</label>
                                        <select value={assignTo} onChange={(e) => setAssignTo(e.target.value)}>
                                            <option value="">Select User</option>
                                            {users.map(u => <option key={u.id} value={u.id}>{u.email}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Role</label>
                                        <select value={taskRole} onChange={(e) => setTaskRole(e.target.value)}>
                                            <option value="">Select Role</option>
                                            {roles.map(r => <option key={r.role} value={r.role}>{r.rolename}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button className="create-btn" onClick={addTask}>Create Task</button>
                                </div>
                            </div>
                            
                            <div className="task-list-card">
                                <h3>All Tasks</h3>
                                <table className="clean-task-table">
                                    <thead><tr><th>Task</th><th>Assignee ID</th><th>Actions</th></tr></thead>
                                    <tbody>
                                        {tasks.map(t => (
                                            <tr key={t.id}>
                                                <td><strong>{t.task}</strong><p>{t.desc}</p></td>
                                                <td>{t.assigneeId}</td>
                                                <td><button className="delete-clean-btn" onClick={() => deleteTask(t.id)}>Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* USER MANAGER */}
                    {activePage === "usermanager" && (
                        <div className="task-page">
                            <div className="card">
                                <h3>Map Role to User</h3>
                                <div className="input-row">
                                    <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                                        <option value="">Select User</option>
                                        {users.map(u => <option key={u.id} value={u.id}>{u.email}</option>)}
                                    </select>
                                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                                        <option value="">Select Role</option>
                                        {roles.map(r => <option key={r.role} value={r.role}>{r.rolename}</option>)}
                                    </select>
                                    <button onClick={mapUserToRole}>Assign</button>
                                </div>
                            </div>
                            <div className="card">
                                <h3>Users List</h3>
                                <table className="data-table">
                                    <thead><tr><th>ID</th><th>Email</th><th>Role</th></tr></thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u.id}><td>{u.id}</td><td>{u.email}</td><td>{u.rolename || "No Role"}</td></tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ROLE MANAGER */}
                    {activePage === "roles" && (
                        <div className="card">
                            <h3>Role Manager</h3>
                            <div className="input-row">
                                <input type="text" value={roleName} onChange={(e) => setRoleName(e.target.value)} placeholder="New Role..." />
                                <button onClick={addRole}>Add Role</button>
                            </div>
                            <table className="data-table">
                                <thead><tr><th>ID</th><th>Name</th></tr></thead>
                                <tbody>
                                    {roles.map(r => <tr key={r.role}><td>{r.role}</td><td>{r.rolename}</td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* MY TASKS */}
                    {activePage === "mytask" && (
                        <div className="card">
                            <h3>My Tasks</h3>
                            <table className="clean-task-table">
                                <thead><tr><th>Task</th><th>Description</th></tr></thead>
                                <tbody>
                                    {tasks.filter(t => t.assigneeId == username).map(t => (
                                        <tr key={t.id}><td>{t.task}</td><td>{t.desc}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;