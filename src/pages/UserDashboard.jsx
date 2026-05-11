import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="user-dashboard-page">
      <h1>UserDashboard</h1>
      <Link to="/">Home</Link>
    </div>
  );
};

export default UserDashboard;
