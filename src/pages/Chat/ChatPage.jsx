import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'; // function from the library
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
const socket = io.connect('http://localhost:5006'); //we will use this to emmit and listen to events

//Explanation: when we send data, we can only send it  to the backend.
// But that we want to send it to another user, so the backend will be used as a layer for this
// Font send to back -> back send back to front

function ChatPage() {
    const [state, setState] = useState({ message: '', username: '' });
    const [chat, setChat] = useState([]); // array of multiple objects of messages and usernames - used for display
    const [room, setRoom] = useState('');

    //we use useEffect to be called everytime we recieve we recive a message
    // We are saying that we listen for an even like in the backend
    useEffect(() => {
        socket.on('recieve_message_from_back', ({ username, message }) => {
            setChat([...chat, { username, message }]);
        });
        return () => socket.current.disconnect();
    }, [socket]); //when ever we have an event, we listen again

    const { user } = useContext(AuthContext);
    if (user === null) {
        return null;
    }

    const joinRoom = () => {
        if (room !== '') {
            socket.emit('join_room', room);
        }
    };

    const onTextChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, message } = state;
        socket.emit('send_message_to_backend', { username, message }); // sending to the backend the information
        setState({ message: '', username });
    };

    return (
        <div>
            <h1> My messages </h1>
            <div className="messageCard">
                <form onSubmit={handleSubmit}>
                    <h2>Chat with owner</h2>
                    <div className="filds">
                        <input
                            type="text"
                            name="username"
                            onChange={(e) => onTextChange(e)}
                            value={user.username}
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

                    {chat.map(({ username, message }, index) => {
                        console.log(username);
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
    );
}

export default ChatPage;
