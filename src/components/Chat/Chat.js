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
            setCurrentMessage('');
        }
    };

    useEffect(() => {
        socket.on('receive_message', ({ username, message }) => {
            alert(`${username} ${message}`);
            console.log('2', username, message);
        });
        return () => socket.current.disconnect();
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
                        {chat.map(({ username, message }, index) => {
                            return (
                                <div key={index}>
                                    <h3>
                                        {username}: <span>{message}</span>
                                    </h3>
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
