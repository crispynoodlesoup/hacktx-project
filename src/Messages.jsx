import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client"

function Messages() {
  const [messageBox, setMessageBox] = useState("");
  const [contactData, setContactData] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const username = localStorage.getItem("user")

  useEffect(() => {
    axios.post("http://127.0.0.1:5000/getUserChats", {'username': username})
    .then((response) => {
      setContactData(response.data)
    }).catch((error) => {
      console.error("Error fetching contacts: " + error)
    });
  }, [])

  useEffect(() => {
    if(selectedContact) {
      axios.get("http://127.0.0.1:5000/getUserMessages", {
        params: {
          sender_id: username,
          recipient_id: selectedContact.username
        },
      }).then((response) => {
        setMessageData(response.data);
      }).catch((error) => {
        console.error("Error fetching this contacts messages: " + error)
      });
    }
    const socket = io("http://127.0.0.1:5000");
    socket.on("receive_message", (message) => {
      setMessageData([...messageData, message])
    });
    return () => {
      socket.disconnect();
    }
  }, [selectedContact, username]);

  const sendMessage = () => {
    if(selectedContact && messageBox.trim() !== "") {
      const newMessage = {
        sender_id: username,
        recipient_id: selectedContact.username,
        message: messageBox,
      };
      socket.emit("send_message", newMessage);
      setMessageData([...messageData, newMessage]);
      setMessageBox("")
    }
  };

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
                  <li key={contact.name} className="user-contact">
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
            <h2>{selectedContact ? selectedContact.username : "Select Contact"}</h2>
          </div>
          <div className="chat">
            {messageData.map((message) => {
              return (
                <div key={message.id} className="user-message">
                  <p className="sender-info">{`${message.sender} - ${message.date}`}</p>
                  <p className="message-content">{message.content}</p>
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
            <button onClick={sendMessage}>submit</button>
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
