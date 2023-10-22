import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { socket } from "./socket";
import io from "socket.io-client"
import homeCity from "./assets/canva/home_city.png";
import logo from "./assets/canva/healthy-build-white-icon.png";
import truck1 from "./assets/canva/trucks.png";
import truck2 from "./assets/canva/trucks2.png";
import truck3 from "./assets/canva/trucks3.png";
import homeIcon from "./assets/canva/home.png";
import messageIcon from "./assets/canva/message.png";
import accountIcon from "./assets/canva/account.png";

function Messages() {
  const [messageBox, setMessageBox] = useState("");
  const [contactData, setContactData] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const socket = io("https://hacktxserver.fly.dev");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [progress, setProgress] = useState(0);
  const username = localStorage.getItem("user");

  useEffect(() => setProgress(40), []);

  const handleContactClick = (contactname) => {
    setSelectedContact(contactname)
  }

  useEffect(() => {
    axios
      .post("https://hacktxserver.fly.dev/getUserChats", { username: username, })
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
        .post("https://hacktxserver.fly.dev/getUserMessages", { sender_id: selectedContact, recipient_id: username})
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
        recipient_id: selectedContact,
        message: messageBox,
      };
      // axios
      // .post("http://127.0.0.1:5000/sendMessage", newMessage)
      // .then((response) => {
      //   setMessageData(response.data);
      //   console.log("Message sent" + response.data)
      // }).catch((error) => {
      //   console.error("Error sending message: " + error)
      // })
      // setMessageBox("");
      socket.emit("send_message", newMessage);
      setMessageBox("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessageData((prevMessageData) => [...prevMessageData, message])
    })
    return () => {
      socket.disconnect90
    }
  }, [selectedContact, username])

  const reversedMessages = messageData.slice().reverse()

  return (
    <div className="Messages">
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
            <li className="selected-page">
              <img className="nav-icon" src={messageIcon} alt="" />
              <p>Messages</p>
            </li>
          </Link>
          <Link to="../profile">
            <li>
              <img className="nav-icon" src={accountIcon} alt="" />
              <p>Profile</p>
            </li>
          </Link>
        </ul>
      </nav>
      <main className="messages-page">
      <div className="messaging-wrapper">
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
          <div className="relationship-level">
            <h3>Level 2</h3>
          </div>
          <div className="relationship-bottom">
            <img className="truck" src={progress < 33 ? truck1 : progress < 66 ? truck2 : truck3} alt="" />
            <p className="progress">{progress}%!</p>
            <div className="progress-bar">
              <div style={{width: `${progress}%`}}></div>
            </div>
          </div>
        </div>
        </div>
        <img className="home-city" src={homeCity} alt="" />
      </main>
    </div>
  );
}

export default Messages;
