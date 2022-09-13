<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
<<<<<<<< HEAD:src/components/Chat/Chat.js
import React, { useEffect, useState } from 'react';
========
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'; // function from the library
const socket = io.connect('http://localhost:5006'); //we will use this to emmit and listen to events
>>>>>>>> edd0146 (wip):src/pages/Chat/ChatPage.jsx
>>>>>>> edd0146 (wip)

function Chat({ socket, username, room }) {
    const [state, setState] = useState({ message: '', username: '' });
    const [chat, setChat] = useState([]); // array of multiple objects of messages and usernames - used for display
<<<<<<< HEAD

    //we use useEffect to be called everytime we recieve we recive a message
    // We are saying that we listen for an even like in the backend
=======
<<<<<<<< HEAD:src/components/Chat/Chat.js

    //we use useEffect to be called everytime we recieve we recive a message
    // We are saying that we listen for an even like in the backend
========
    const [room, setRoom] = useState('');
    
    const joinRoom = () => {
        if (room !== '') {
            socket.emit('join_room', room);
        }
    };
>>>>>>>> edd0146 (wip):src/pages/Chat/ChatPage.jsx
>>>>>>> edd0146 (wip)

    const onTextChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, message } = state;
        socket.emit('send_message', { username, message }); // sending to the backend the information
        setState({ message: '', username });
    };

<<<<<<< HEAD
    useEffect(() => {
        socket.on('receive_message', ({ username, message }) => {
            alert(`${username} ${message}`);
            console.log('1', { username, message });
            console.log('2', username, message);
=======
<<<<<<<< HEAD:src/components/Chat/Chat.js
    useEffect(() => {
        socket.on('recieve_message', ({ username, message }) => {
            alert({ username, message });
            console.log({ username, message });
========
    //we use useEffect to be called everytime we recieve we recive a message
    // We are saying that we listen for an even like in the backend
    useEffect(() => {
        socket.on('recieve_message_from_back', ({ username, message }) => {
            setChat([...chat, { username, message }]);
>>>>>>>> edd0146 (wip):src/pages/Chat/ChatPage.jsx
>>>>>>> edd0146 (wip)
        });
        return () => socket.current.disconnect();
    }, [socket]); //when ever we have an event, we listen again

    return (
        <div>
            <h1> Chat with Handeer </h1>
            <div className="messageCard">
                <form onSubmit={handleSubmit}>
<<<<<<< HEAD
=======
<<<<<<<< HEAD:src/components/Chat/Chat.js
========
                    <h2>Messanger</h2>
>>>>>>>> edd0146 (wip):src/pages/Chat/ChatPage.jsx
>>>>>>> edd0146 (wip)
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
