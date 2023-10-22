import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { socket } from "./socket";
import homeCity from "./assets/canva/home_city.png";
import logo from "./assets/canva/healthy-build-white-icon.png";

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
  const [messageBox, setMessageBox] = useState("");
  const [contactData, setContactData] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const username = localStorage.getItem("user");

  useEffect(() => {
    axios
      .post("https://hacktxserver.fly.dev/getUserChats", { username: username })
      .then((response) => {
        setContactData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contacts: " + error);
      });
  }, []);

  useEffect(() => {
    if (selectedContact) {
      axios
        .get("https://hacktxserver.fly.dev/getUserMessages", {
          params: {
            sender_id: username,
            recipient_id: selectedContact.username,
          },
        })
        .then((response) => {
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
      setMessageData([...messageData, message]);
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
      setMessageData([...messageData, newMessage]);
      setMessageBox("");
    }
  };

  const reversedMessages = messageData.toReversed();

  return (
    <div className="Messages">
      <nav>
        <img className="nav-logo" src={logo} alt="" />
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
        <div className="messaging-wrapper">
          <div className="messaging-main-div">
            <div className="contacts">
              <h3 className="contacts-header">Contacts</h3>
              <ul>
                {contactData.map((contact) => {
                  return (
                    <li
                      key={contact.name}
                      className={
                        contact.name == "john"
                          ? "user-contact selected-contact"
                          : "user-contact"
                      }
                    >
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
              <h2>
                {selectedContact ? selectedContact.username : "Select Contact"}
              </h2>
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
        </div>
        <img className="home-city" src={homeCity} alt="" />
      </main>
    </div>
  );
}

export default Messages;
