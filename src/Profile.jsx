import { Link } from "react-router-dom";
import logo from "./assets/canva/healthy-build-white-icon.png";
import homeIcon from "./assets/canva/home.png";
import messageIcon from "./assets/canva/message.png";
import accountIcon from "./assets/canva/account.png";

function Profile() {
  return (
    <div className="Profile">
      <nav>
        <img className="nav-logo" src={logo} alt="" />
        <ul>
          <Link to="../home">
            <li>
              <img className="nav-icon" src={homeIcon} alt="" />
              <p>Home</p>
            </li>
          </Link>
          <Link to="../messages">
            <li>
              <img className="nav-icon" src={messageIcon} alt="" />
              <p>Messages</p>
            </li>
          </Link>
          <Link to="../profile">
            <li className="selected-page">
              <img className="nav-icon" src={accountIcon} alt="" />
              <p>Profile</p>
            </li>
          </Link>
        </ul>
      </nav>
      <main className="profile-page"></main>
    </div>
  );
}

export default Profile;
