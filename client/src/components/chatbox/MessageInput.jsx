// import { useState } from "react";
// import PropTypes from "prop-types";

// function MessageInput({ addMessage }) {
//   const [inputValue, setInputValue] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (inputValue.trim()) {
//       addMessage(inputValue);
//       setInputValue("");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="message-input">
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Type your message..."
//       />
//       <button type="submit">Send</button>
//     </form>
//   );
// }

// MessageInput.propTypes = {
//   addMessage: PropTypes.func.isRequired,
// };

// export default MessageInput;
