import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { socket } from "./socket";;

function Messages() {
  const [messageBox, setMessageBox] = useState("");
  const [contactData, setContactData] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isConnected, setIsConnected] = useState(socket.connected)
  const username = localStorage.getItem("user");

  const handleContactClick = (contactname) => {
    setSelectedContact(contactname)
  }

  useEffect(() => {
    axios
      .post("http://127.0.0.1:5000/getUserChats", { username: username, })
      .then((response) => {
        setContactData(response.data)
      })
      .catch((error) => {
        console.error("Error fetching contacts: " + error);
      });
  }, [username]);

  useEffect(() => {
    if (selectedContact) {
      axios
        .post("http://127.0.0.1:5000/getUserMessages", { sender_id: selectedContact, recipient_id: username})
        .then((response) => {
          console.log(response.data)
          setMessageData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching this contacts messages: " + error);
        });
    }
    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });
    socket.on("receive_message", (message) => {
      setMessageData((prevMessageData) => [...prevMessageData, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, [selectedContact, username]);

  const sendMessage = () => {
    if (selectedContact && messageBox.trim() !== "") {
      const newMessage = {
        sender_id: username,
        recipient_id: selectedContact.username,
        message: messageBox,
      };
      socket.emit("send_message", newMessage);
      setMessageData((prevMessageData) => [...messageData, newMessage]);
      setMessageBox("");
    }
  };

  const reversedMessages = messageData.slice().reverse()

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
              {contactData.map((contact) => (
                <li key={contact.username} className={
                  contact.name != selectedContact
                    ? "user-contact selected-contact"
                    : "user-contact"
                }
                onClick = {() => handleContactClick(contact.username)}
                > 
                  <p>
                    <strong>{contact.username}</strong>
                  </p>
                  <p>
                    <em>{contact.message}</em>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="chat-header">
            <h2>
              {selectedContact ? selectedContact : "Select Contact"}
            </h2>
          </div>
          <div className="chat">
            {reversedMessages.map((message) => {
              return (
                <div key={message.id} className="user-message">
                  <p className="sender-info">{`${message.sender_id} - ${message.timestamp}`}</p>
                  <p className="message-content">{message.text}</p>
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
              <button onClick={sendMessage}></button>
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
