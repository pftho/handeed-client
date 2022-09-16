import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../../context/auth.context';
import './Chat.css';
const socket = io.connect(process.env.REACT_APP_WS_URL);

const formatter = new Intl.RelativeTimeFormat('en', { style: 'narrow' });

const DIVISIONS = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' },
];

function formatTimeAgo(date) {
    let duration = (date - new Date()) / 1000;

    for (let i = 0; i <= DIVISIONS.length; i++) {
        const division = DIVISIONS[i];
        if (Math.abs(duration) < division.amount) {
            return formatter.format(Math.round(duration), division.name);
        }
        duration /= division.amount;
    }
}

function Chat({ username, chat }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { user } = React.useContext(AuthContext);
    const onTextChange = (e) => {
        setCurrentMessage(e.target.value);
    };

    useEffect(() => {
        //send information to back
        console.log('JOIN', chat._id);
        socket.emit('join_room', chat._id);

        //listen from back for "sync_messages" event
        socket.on('receive_message', (data) => {
            console.log('message', data);
            setMessages((messages) => [...messages, data]);
        });

        //listen for "sync_messages" event
        socket.on('sync_messages', (data) => {
            console.log(data);
            setMessages(data);
        });

        return () => {
            socket.off('receive_message');
            socket.off('disconnect');
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentMessage !== '') {
            const messageData = {
                room: chat._id,
                author: user.id,
                message: currentMessage,
                time: new Date(),
            };

            await socket.emit('send_message', messageData);

            // setMessages((messages) => [...messages, messageData]);
            setCurrentMessage('');
        }
    };
    console.log(messages);
    return (
        <div>
            <div className="chat-container">
                <div className="chat-header">
                    <h1>Live Chat</h1>
                    <p>From: {chat.sender.username}</p>
                    <p>To: {chat.receiver.username}</p>
                </div>
                <div id="chat">
                    <div className="chat-render">
                        <div className="message-container">
                            {messages.map((message) => {
                                return (
                                    <div
                                        key={message._id}
                                        className="message-content"
                                    >
                                        <div>
                                            <p>
                                                {message._id} :{' '}
                                                {message.message}
                                            </p>
                                        </div>
                                        <div className="message-info">
                                            <p id="time">
                                                {formatTimeAgo(
                                                    new Date(message.time)
                                                )}
                                            </p>
                                            <p id="author">{message.sender}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <form className='chat-form' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="message"
                        placeholder="Hello..."
                        value={currentMessage}
                        onChange={(e) => onTextChange(e)}
                    />
                    <button className='send-message' type="submit"><i class="fa-regular fa-paper-plane fa-lg"></i></button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
