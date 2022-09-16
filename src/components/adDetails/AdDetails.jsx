import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Chat from '../Chat/Chat';
import { AuthContext } from '../../context/auth.context';
import Modal from 'react-modal';
import axios from 'axios';
import './AdDetails.css';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';
Modal.setAppElement('#root');

function AdDetails({
    _id,
    image,
    title,
    description,
    brand,
    size,
    category,
    condition,
    owner,
    handleDelete,
    onChatOpen,
    chats,
}) {
    const { isOwner, checkIfOwner, user, setUser, getToken, isLoggedIn } =
        useContext(AuthContext);
    const { adId } = useParams();
    const [isChatVisible, setIsChatVisible] = React.useState(false);

    useEffect(() => {
        checkIfOwner(adId);
    }, [adId, checkIfOwner]);

    let map;
    if (owner !== undefined && owner.location !== undefined) {
        const latlng = [
            owner.location.coordinates[1],
            owner.location.coordinates[0],
        ];
        map = (
            <MapContainer
                center={latlng}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '500px', width: '1000px' }}
                className="map"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={latlng}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        );
    }

    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    const handleRoomCreation = async () => {
        if (user.credits < 1) {
            window.alert(
                'You are out of dresses, make a donation to earn more'
            );

            return;
        }

        setModalIsOpen(true);
    };

    const handlePositiveResponse = async () => {
        setModalIsOpen(false);

        await axios.put(
            `${API_URL}/api/profile/user/${user.id}`,
            { credits: user.credits - 1 },
            {
                headers: { Authorization: `Bearer ${getToken()}` },
            }
        );
        setUser({ ...user, credits: user.credits - 1 });
        setIsChatVisible(true);
        onChatOpen();

        await axios.post(
            `${API_URL}/api/chat/contact`,
            {
                chatname: title,
                sender: user.id,
                receiver: owner._id,
                ad: _id,
                messages: [],
            },
            {
                headers: { Authorization: `Bearer ${getToken()}` },
            }
        );
    };

    const handleNegativeResponse = async () => {
        setModalIsOpen(false);
    };

    return (
        <div className="ad-details">
            <div className="img-content">
                <img src={image} alt="" />
                <div className="details-content">
                    <h1>{title}</h1>
                    <p className="description">{description}</p>
                    <div className="details-text">
                        <h3>Brand:</h3>
                        <span> {brand}</span>
                    </div>
                    <div className="details-text">
                        <h3>Size: </h3> <span>{size}</span>
                    </div>
                    <div className="details-text">
                        <h3>Category: </h3>
                        <span>{category}</span>
                    </div>
                    <div className="details-text">
                        <h3>Condition: </h3>
                        <span>{condition}</span>
                    </div>
                </div>
            </div>

            {isOwner && (
                <>
                    <Link to={`/ads/${_id}/edit`}>
                        <button>Edit this ad</button>
                    </Link>
                    <button onClick={handleDelete}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </>
            )}

            {map}

            {(isChatVisible || chats.length) && isLoggedIn ? (
                chats.map((chat) => {
                    return (
                        <Chat
                            key={chat._id}
                            chat={chat}
                            username={user.username}
                        />
                    );
                })
            ) : isOwner ? null : (
                <button
                    id="chat-btn"
                    className="contact-btn"
                    onClick={handleRoomCreation}
                >
                    Chat with owner
                </button>
            )}

            <Modal
                style={customStyles}
                isOpen={modalIsOpen}
                ariaHideApp={false}
                onRequestClose={closeModal}
            >
                <form className="contact-owner-form-modal">
                    <h1>Chat with owner</h1>
                    <button
                        className="modal-btn"
                        id="response-yes"
                        onClick={handlePositiveResponse}
                    >
                        Use one dress
                    </button>
                    <button
                        className="modal-btn"
                        id="response-no"
                        onClick={handleNegativeResponse}
                    >
                        no, thank you{' '}
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default AdDetails;
