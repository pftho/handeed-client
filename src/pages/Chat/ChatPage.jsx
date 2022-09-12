import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

function ChatPage() {
    const [state, setState] = useState({ message: '', username: '' });
    const [chat, setChat] = useState([]); // array of multiple objects of messages and usernames

    const socketRef = useRef();

    const onTextChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, message } = state;
        socketRef.current.emit('message', { username, message });
        setState({ message: '', username });
    };

    useEffect(() => {
        socketRef.current = io.connect('http://localhost:5006');
        socketRef.current.on('message', ({ username, message }) => {
            setChat([...chat, { username, message }]);
        });
        return () => socketRef.current.disconnect();
    }, [chat]);

    return (
        <div>
            <h1> My messages </h1>
            <div className="messageCard">
                <form onSubmit={handleSubmit}>
                    <h2>Messanger</h2>
                    <div className="filds">
                        <input
                            type="text"
                            name="username"
                            onChange={(e) => onTextChange(e)}
                            value={state.username}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="message"
                            onChange={(e) => onTextChange(e)}
                            value={state.message}
                        />
                    </div>
                    <button type="submit">Send</button>
                </form>
                <div className="chatRender">
                    <h1>Messages Log</h1>
                    {chat.map(({ name, message }, index) => {
                        return (
                            <div key={index}>
                                <h3>
                                    {name}: <span>{message}</span>
                                </h3>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
