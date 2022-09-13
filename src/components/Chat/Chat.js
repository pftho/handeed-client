import React, { useEffect, useState } from 'react';

function Chat({ socket, username, room }) {
    const [state, setState] = useState({ message: '', username: '' });
    const [chat, setChat] = useState([]); // array of multiple objects of messages and usernames - used for display

    //we use useEffect to be called everytime we recieve we recive a message
    // We are saying that we listen for an even like in the backend

    const onTextChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, message } = state;
        socket.emit('send_message', { username, message }); // sending to the backend the information
        setState({ message: '', username });
    };

    useEffect(() => {
        socket.on('receive_message', ({ username, message }) => {
            alert(`${username} ${message}`);
            console.log('1', { username, message });
            console.log('2', username, message);
        });
        return () => socket.current.disconnect();
    }, [socket]); //when ever we have an event, we listen again

    return (
        <div>
            <h1> Chat with Handeer </h1>
            <div className="messageCard">
                <form onSubmit={handleSubmit}>
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
                    <button>Send</button>
                </form>
                <div className="chatRender">
                    <h1>Messages Log</h1>
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
