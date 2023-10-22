import { useState } from "react";
import { Link } from "react-router-dom";

const contactData = [
  {
    name: "john",
    lastMessage: "boy what",
  },
  {
    name: "keb",
    lastMessage: "bom what",
  },
  {
    name: "pee",
    lastMessage: "boi what",
  },
];
const messageData = [
  {
    id: "1",
    content: "hey what the heck",
    sender: "what",
    recipient: "john",
    date: "19-2-2009",
  },
  {
    id: "2",
    content: "hey whaattttt",
    sender: "john",
    recipient: "what",
    date: "19-2-2009",
  },
  {
    id: "3",
    content: "boy what",
    sender: "john",
    recipient: "what",
    date: "19-2-2009",
  },
];

function Messages() {
  const [messageBox, setMessageBox] = useState();

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
      <main className="messages-page">
        <div className="messaging-main-div">
          <div className="contacts">
            <h3>Contacts</h3>
            {contactData.map((contact) => {
              return (
                <div key={contact.name} className="user-contact">
                  <p>
                    <strong>{contact.name}</strong>
                  </p>
                  <p>
                    <em>{contact.lastMessage}</em>
                  </p>
                </div>
              );
            })}
          </div>
          <div className="chat-header">
            <h2>John</h2>
          </div>
          <div className="chat">
            {messageData.map((message) => {
              return (
                <div key={message.id} className="user-message">
                  <p>{`${message.sender} - ${message.date}`}</p>
                  <p>{message.content}</p>
                </div>
              );
            })}
          </div>
          <div className="message-bar">
            <input
              type="text"
              value={messageBox}
              onChange={(e) => setMessageBox(e.target.value)}
            />
            <button>submit</button>
          </div>
        </div>
        <div className="relationship-progress">
          <div>
            <h3>Level 2</h3>
          </div>
          <div>
            <p>100%!</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Messages;
