 import React, { useState, useEffect, useRef } from "react";
import { Send, Image, Video, File, Mic, Phone, VideoIcon } from "lucide-react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [media, setMedia] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Function to send message or media
  const sendMessage = () => {
    if (newMessage.trim() !== "" || media) {
      const messageData = { text: newMessage, sender: "me", media };
      socket.emit("sendMessage", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
      setMedia(null);
    }
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMedia({
        name: file.name,
        type: file.type.startsWith("image") ? "image" : 
              file.type.startsWith("video") ? "video" : 
              "file",
        url: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-gradient-to-b from-purple-700 to-gray-900 p-3 rounded-t-2xl text-white flex justify-between items-center">
        <span className="text-lg font-semibold">Chat Room</span>
        <div className="flex space-x-3">
          <button className="bg-green-500 p-2 rounded-full hover:bg-green-600">
            <Phone size={20} className="text-white" />
          </button>
          <button className="bg-blue-500 p-2 rounded-full hover:bg-blue-600">
            <VideoIcon size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-[70%] ${
              msg.sender === "me"
                ? "bg-purple-700 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg.text}
            {msg.media && msg.media.type === "image" && (
              <img src={msg.media.url} alt="sent" className="w-32 h-32 mt-2 rounded-lg" />
            )}
            {msg.media && msg.media.type === "video" && (
              <video controls className="w-40 mt-2 rounded-lg">
                <source src={msg.media.url} type="video/mp4" />
              </video>
            )}
            {msg.media && msg.media.type === "file" && (
              <a
                href={msg.media.url}
                download
                className="block text-blue-500 mt-2 underline"
              >
                {msg.media.name}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Input Field & Media Upload */}
      <div className="flex items-center bg-gray-200 rounded-xl p-2">
        {/* File Input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-gray-500 text-white p-2 rounded-xl hover:bg-gray-600 transition mx-1"
        >
          <File size={20} />
        </button>
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-gray-500 text-white p-2 rounded-xl hover:bg-gray-600 transition mx-1"
        >
          <Image size={20} />
        </button>
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-gray-500 text-white p-2 rounded-xl hover:bg-gray-600 transition mx-1"
        >
          <Video size={20} />
        </button>

        {/* Text Input */}
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-transparent outline-none p-2"
        />

        {/* Send Button */}
        <button
          onClick={sendMessage}
          className="bg-purple-700 text-white p-2 rounded-xl hover:bg-purple-800 transition"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
 