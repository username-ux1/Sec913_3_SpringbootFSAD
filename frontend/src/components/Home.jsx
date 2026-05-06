import "./Home.css";

const Home = () => {

    return (
        <div className="home-container">

            {/* HEADER */}
            <div className="topbar">
                <div className="logo-section">
                    <img
                        src="http://localhost:5173/logo.png"
                        alt="logo"
                    />
                 
                </div>

                <div className="user-section">
                    <span>Roshini</span>
                    <button className="logout-btn">⏻</button>
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
                            <input type="text" placeholder="Enter role" />
                            <button>Add Role</button>
                        </div>

                    </div>

                    {/* MENU */}
                    <div className="card">

                        <h3>Menu</h3>

                        <div className="input-row">
                            <input type="text" placeholder="Enter menu" />
                            <button>Add</button>
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

                                <label><input type="checkbox" /> MyTask</label>
                                <label><input type="checkbox" /> Task Manager</label>
                                <label><input type="checkbox" /> User Manager</label>
                                <label><input type="checkbox" /> Role Manager</label>
                                <label><input type="checkbox" /> My Profile</label>

                                <button>Add</button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Home;
