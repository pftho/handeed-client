import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';
import { AuthContext } from '../../context/auth.context';
const socket = io.connect('http://localhost:5006');

function Chat({ username, room, chat }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { user } = React.useContext(AuthContext);

    const onTextChange = (e) => {
        setCurrentMessage(e.target.value);
    };

    useEffect(() => {
        socket.emit('join_room', room);
        socket.on('receive_message', (data) => {
            console.log('message', data);
            setMessages((messages) => [...messages, data]);
        });

        socket.on('sync_messages', (data) => {
            setMessages(data);
        });

        return () => {
            socket.off('receive_message');
            socket.off('disconnect');
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentMessage !== '') {
            const messageData = {
                room: chat._id,
                author: user.id,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ':' +
                    new Date(Date.now()).getMinutes(),
            }; // to push in the message list
            //update model

            await socket.emit('send_message', messageData);
            setMessages((messages) => [...messages, messageData]);
            setCurrentMessage('');
        }
    };

    return (
        <div>
            <div className="chat">
                <h1> Contact owner </h1>
                <p>sender: {chat.sender.username}</p>
                <p>receiver: {chat.receiver.username}</p>
                <div>
                    <div className="chatRender">
                        <div className="message-container">
                            <h1>Live Chat</h1>{' '}
                            {messages.map((message) => {
                                return (
                                    <div
                                        key={uuidv4()}
                                        className="message-content"
                                    >
                                        <div>
                                            <p>{message.message}</p>
                                        </div>
                                        <div className="message-info">
                                            <p id="time">{message.time}</p>
                                            <p id="author">{message.author}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="message"
                            placeholder="Hello..."
                            onChange={(e) => onTextChange(e)}
                        />
                        <button type="submit">&#9658;</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;
