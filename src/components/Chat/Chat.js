import React, { useEffect, useState } from 'react';

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [chat, setChat] = useState([]);

    const onTextChange = (e) => {
        setCurrentMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            await socket.emit('send_message', messageData); // sending to the backend the information
            setChat((chat) => [...chat, messageData]);
            setCurrentMessage('');
        }
    };

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setChat((chat) => [...chat, data]);
        });
    }, [socket]); //when ever we have an event, we listen again

    return (
        <div>
            <div className="chat">
                <h1> Contact owner </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="message"
                            placeholder="Hello..."
                            onChange={(e) => onTextChange(e)}
                            value={currentMessage.message}
                        />
                    </div>
                    <button>&#9658;</button>
                </form>
                <div className="chatRender">
                    <h1>Live Chat</h1>
                    <div>
                        {' '}
                        {chat.map((message) => {
                            return (
                                <div>
                                    <div className="message-content">
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
