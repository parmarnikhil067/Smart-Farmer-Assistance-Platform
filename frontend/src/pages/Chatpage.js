import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import socket from '../socket'

function ChatPage() {
    const [selectedUser, setSelectedUser] = useState(0);

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([{
            sender: "Rajesh Farmer",
            text: "Hello, Wheat available?",
            time: "10:15 AM",
            type: "received",
        },
        {
            sender: "Me",
            text: "Yes, 100 KG available.",
            time: "10:16 AM",
            type: "sent",
        },
    ]);

    const messagesEndRef = useRef(null);

    const users = [{
            id: 1,
            name: "Rajesh Farmer",
            status: "Online",
            avatar: "https://i.pravatar.cc/150?img=1",
        },
        {
            id: 2,
            name: "Amit Buyer",
            status: "Online",
            avatar: "https://i.pravatar.cc/150?img=2",
        },
        {
            id: 3,
            name: "Suresh Farmer",
            status: "Offline",
            avatar: "https://i.pravatar.cc/150?img=3",
        },
    ];
    const sendMessage = () => {
        if (!message.trim()) return;

        const newMessage = {
            sender: "Me",
            text: message,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            type: "sent",
        };

        setMessages([...messages, newMessage]);
        setMessage("");
    };


    useEffect(() => {
        messagesEndRef.current.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);



    useEffect(() => {

        socket.on(

            "receiveMessage",

            (message) => {

                setMessages(
                    (prev) => [
                        ...prev,
                        message
                    ]
                );

            }

        );

        return () => {

            socket.off(
                "receiveMessage"
            );

        };

    }, []);

    return ( <
        div className = "chat-page" >

        { /* Sidebar */ } <
        div className = "chat-sidebar" >

        <
        div className = "sidebar-header" >
        <
        h2 > 💬Chats < /h2>

        <
        input type = "text"
        placeholder = "Search chats..." /
        >
        <
        /div>

        {
            users.map((user, index) => ( <
                div key = { user.id }
                className = { `chat-user ${
              selectedUser === index ? "active" : ""
            }` }
                onClick = {
                    () => setSelectedUser(index)
                } >
                <
                img src = { user.avatar }
                alt = { user.name }
                />

                <
                div >
                <
                h4 > { user.name } < /h4> <
                span > { user.status } < /span> < /
                div > <
                /div>
            ))
        } <
        /div>

        { /* Chat Area */ } <
        div className = "chat-main" >

        <
        div className = "chat-header" >
        <
        img src = { users[selectedUser].avatar }
        alt = "" /
        >

        <
        div >
        <
        h3 > { users[selectedUser].name } < /h3> <
        span > { users[selectedUser].status } < /span> < /
        div > <
        /div>

        { /* Messages */ } <
        div className = "messages" >

        {
            messages.map((msg, index) => ( <
                div key = { index }
                className = { `message ${msg.type}` } > { msg.text }

                <
                span > { msg.time } < /span> < /
                div >
            ))
        }

        <
        div ref = { messagesEndRef } > < /div> < /
        div >

        { /* Input */ } <
        div className = "chat-input" >

        <
        button > 😊 < /button>

        <
        label className = "file-btn" > 📎
        <
        input type = "file"
        hidden /
        >
        <
        /label>

        <
        input type = "text"
        placeholder = "Type a message..."
        value = { message }
        onChange = {
            (e) =>
            setMessage(e.target.value)
        }
        onKeyDown = {
            (e) =>
            e.key === "Enter" && sendMessage()
        }
        />

        <
        button onClick = { sendMessage } > ➤
        <
        /button>

        <
        /div>

        <
        /div>

        <
        /div>
    );
}

export default ChatPage;