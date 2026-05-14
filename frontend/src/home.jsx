import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {

    const navigate = useNavigate();

    const [roleName, setRoleName] = useState("");

    // GET USERNAME FROM LOCAL STORAGE
    const username = localStorage.getItem("username");

    // LOGOUT FUNCTION
    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    // ADD ROLE FUNCTION
   const addRole = async () => {

    const randomRoleId = Math.floor(Math.random() * 1000);

    await fetch(
        `http://localhost:8000/authservice/addrole?role=${randomRoleId}&rolename=${roleName}`,
        {
            method: "POST"
        }
    );

    alert("Role Added");

    setRoleName("");
    };

    return (
        <div className="home-container">

            {/* HEADER */}
            <div className="topbar">

                <div className="logo-section">

                    <img
                        src="http://localhost:5173/logo.png"
                        alt=""
                    />

                    <h2>Micro-Task Hub</h2>

                </div>

                <div className="user-section">

                    {/* DYNAMIC USERNAME */}
                    <span>{username}</span>

                    {/* LOGOUT BUTTON */}
                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        ⏻
                    </button>

                </div>

            </div>

            {/* BODY */}
            <div className="main-layout">

                {/* SIDEBAR */}
                <div className="sidebar">

                    <ul>
                        <li className="active">📊 Dashboard</li>
                        <li>📝 My Task</li>
                        <li>⚙️ Task Manager</li>
                        <li>👤 User Manager</li>
                        <li>🙍 My Profile</li>
                        <li className="role-text">Roles</li>
                    </ul>

                </div>

                {/* CONTENT */}
                <div className="content-area">

                    {/* ROLES */}
                    <div className="card">

                        <h3>Roles</h3>

                        <div className="input-row">

                            <input
                                type="text"
                                placeholder="Enter role"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                            />

                            <button onClick={addRole}>
                                Add Role
                            </button>

                        </div>

                    </div>

                    {/* MENU */}
                    <div className="card">

                        <h3>Menu</h3>

                        <div className="input-row">

                            <input
                                type="text"
                                placeholder="Enter menu"
                            />

                            <button>
                                Add
                            </button>

                        </div>

                    </div>

                    {/* MAP MENU */}
                    <div className="card">

                        <h3>Map Menu with Roles</h3>

                        <div className="map-container">

                            <div className="left-side">

                                <select>

                                    <option>Select Role</option>
                                    <option>User</option>
                                    <option>Manager</option>
                                    <option>Admin</option>

                                </select>

                            </div>

                            <div className="right-side">

                                <label>
                                    <input type="checkbox" />
                                    MyTask
                                </label>

                                <label>
                                    <input type="checkbox" />
                                    Task Manager
                                </label>

                                <label>
                                    <input type="checkbox" />
                                    User Manager
                                </label>

                                <label>
                                    <input type="checkbox" />
                                    Role Manager
                                </label>

                                <label>
                                    <input type="checkbox" />
                                    My Profile
                                </label>

                                <button>
                                    Add
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Home;