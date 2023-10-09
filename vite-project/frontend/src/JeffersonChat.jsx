import React, { useState } from 'react';
import './JeffersonChat.css';

function JeffersonChat() {
    const [userInput, setUserInput] = useState(''); // State for the user's input
    const [messages, setMessages] = useState([]);  // State for all messages

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

const handleSendMessage = async () => {
    try {
        const response = await fetch("https://literate-space-bassoon-w6467jvx545hv5vq-3001.app.github.dev/ask-jefferson", {
            method: "POST",
            mode: 'cors', // ensure this line is here
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        const jeffersonReply = data.reply;

        // Add the reply to the messages state and update the UI.
        // This will depend on your current state structure and how you're managing messages.
        setMessages(prevMessages => [...prevMessages, {role: "jefferson", content: jeffersonReply}]);

        // Clear the userInput after sending
        setUserInput("");

    } catch (error) {
        console.error("Failed to get a response:", error);
        // Handle the error in the UI if needed.
    }
};


return (
    <div className="jefferson-chat">
        <div className="chat-box">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.role}`}>
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input 
                    type="text" 
                    placeholder="Ask Thomas Jefferson..." 
                    value={userInput} 
                    onChange={handleInputChange}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    </div>
);
}

export default JeffersonChat;