// import { useState, useEffect } from "react";
// import connexion from "../../services/connexion";
// import MessageList from "./MessageList";
// import MessageInput from "./MessageInput";
// import "../../styles/chat-box.css";

// function ChatBox() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await connexion.get("/games/all");
//         if (Array.isArray(response.data)) {
//           setMessages(response.data);
//         } else {
//           console.error("Invalid response format:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchMessages(); // Initial fetch
//     const intervalId = setInterval(fetchMessages, 1000); // Fetch messages every second

//     return () => clearInterval(intervalId); // Cleanup interval on unmount
//   }, []);

//   const addMessage = async (messageText) => {
//     try {
//       // Optionally, fetch some data or perform other actions
//       // await axios.get('/games/all');

//       console.log("Sending message:", messageText);

//       // Send message to backend
//       await connexion.post("/games/all", {
//         text: messageText,
//         timestamp: new Date().toISOString(),
//       });

//       // Fetch updated messages after sending a new one
//       const response = await connexion.get("/games/all");
//       if (Array.isArray(response.data)) {
//         setMessages(response.data);
//       } else {
//         console.error("Invalid response format:", response.data);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="chatbox">
//       <MessageList messages={messages} />
//       <MessageInput addMessage={addMessage} />
//     </div>
//   );
// }

// export default ChatBox;
