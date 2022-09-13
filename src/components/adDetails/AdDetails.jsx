import React from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import Chat from '../Chat/Chat';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5006'); //we will use this to emmit and listen to events

function AdDetails({
    _id,
    image,
    title,
    description,
    brand,
    size,
    category,
    condition,
    city,
    user,
}) {
    let map;
    if (user !== undefined) {
        const latlng = [
            user.location.coordinates[1],
            user.location.coordinates[0],
        ];
        map = (
            <MapContainer
                center={latlng}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '500px', width: '1000px' }}
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
    const room = _id;
    const joinRoom = () => {
        if (room !== '') {
            socket.emit('join_room', room);
        }
    };

    return (
        <div className="ad-details">
            <img src={image} alt="" />
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{brand}</p>
            <p>{size}</p>
            <p>{category}</p>
            <p>{condition}</p>
            <p>{city}</p>

            <Link to={`/ads/${_id}/edit`}>
                <button>Edit this ad</button>
            </Link>

            <Link to={`/ads/${_id}/message`}>
                <button onClick={joinRoom}>Chat with owner</button>
            </Link>
            <Chat socket={socket} room={room} />
        </div>
    );
}

export default AdDetails;
