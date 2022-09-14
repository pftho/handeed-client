import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5006');

function Chat({ username, room }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [chat, setChat] = useState([]);

    const onTextChange = (e) => {
        setCurrentMessage(e.target.value);
    };

    useEffect(() => {
        socket.emit('join_room', room);
        socket.on('receive_message', (data) => {
            setChat((chat) => [...chat, data]);
        });
        return () => {
            socket.off('receive_message');
            socket.off('disconnect');
        };
    }, []);

    const handleSubmit = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ':' +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit('send_message', messageData);
            setChat((chat) => [...chat, messageData]);
            setCurrentMessage('');
        }
    };

    return (
        <div>
            <div className="chat">
                <h1> Contact owner </h1>

                <div>
                    <input
                        type="text"
                        name="message"
                        placeholder="Hello..."
                        onChange={(e) => onTextChange(e)}
                        onKeyPress={(e) => {
                            e.key === 'Enter' && handleSubmit();
                        }}
                    />
                </div>
                <button onClick={handleSubmit}>&#9658;</button>

                <div className="chatRender">
                    <div className="message-container">
                        <h1>Live Chat</h1>{' '}
                        {chat.map((message) => {
                            return (
                                <div key={uuidv4()} className="message-content">
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
            </div>
        </div>
    );
}

export default Chat;
