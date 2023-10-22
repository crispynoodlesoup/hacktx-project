import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="Profile">
      <nav>
        <ul>
          <Link to="../home">
            <li>Home</li>
          </Link>
          <Link to="../messages">
            <li>Messages</li>
          </Link>
          <Link to="../profile">
            <li className="selected-page">Profile</li>
          </Link>
        </ul>
      </nav>
      <main className="profile-page"></main>
    </div>
  );
}

export default Profile;
