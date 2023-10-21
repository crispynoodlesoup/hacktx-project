import { Link } from "react-router-dom";

function Messages() {
  return (
    <>
      <nav>
        <ul>
          <Link to="../home">
            <li>Home</li>
          </Link>
          <Link to="../messages">
            <li className="selected-page">Messages</li>
          </Link>
          <Link to="../profile">
            <li>Profile</li>
          </Link>
        </ul>
      </nav>
      <main></main>
    </>
  );
}

export default Messages;
