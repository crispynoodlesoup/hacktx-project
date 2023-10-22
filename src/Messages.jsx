import { useState } from "react";
import { Link } from "react-router-dom";
import sendButton from "./assets/send-circle.svg";

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
  {
    id: "4",
    content: "hey what the heck",
    sender: "what",
    recipient: "john",
    date: "19-2-2009",
  },
  {
    id: "5",
    content: "hey whaattttt",
    sender: "john",
    recipient: "what",
    date: "19-2-2009",
  },
  {
    id: "6",
    content: "boy what",
    sender: "john",
    recipient: "what",
    date: "19-2-2009",
  },
  {
    id: "7",
    content: "hey what the heck",
    sender: "what",
    recipient: "john",
    date: "19-2-2009",
  },
  {
    id: "8",
    content: "hey whaattttt",
    sender: "john",
    recipient: "what",
    date: "19-2-2009",
  },
  {
    id: "9",
    content: "boy haha",
    sender: "john",
    recipient: "what",
    date: "19-2-2009",
  },
];

function Messages() {
  const [messageBox, setMessageBox] = useState();

  const reversedMessages = messageData.toReversed();

  return (
    <div className="Messages">
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
            <h3 className="contacts-header">Contacts</h3>
            <ul>
              {contactData.map((contact) => {
                return (
                  <li key={contact.name} className={contact.name == "john" ? "user-contact selected-contact" : "user-contact"}>
                    <p>
                      <strong>{contact.name}</strong>
                    </p>
                    <p>
                      <em>{contact.lastMessage}</em>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="chat-header">
            <h2>John</h2>
          </div>
          <div className="chat">
            {reversedMessages.map((message) => {
              return (
                <div key={message.id} className="user-message">
                  <p className="sender-info">{`${message.sender} - ${message.date}`}</p>
                  <p className="message-content">{message.content}</p>
                </div>
              );
            })}
          </div>
          <div className="message-section">
            <label className="message-bar" htmlFor="message-box">
              <input
                id="message-box"
                type="text"
                value={messageBox}
                onChange={(e) => setMessageBox(e.target.value)}
              />
              <button></button>
            </label>
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
    </div>
  );
}

export default Messages;
