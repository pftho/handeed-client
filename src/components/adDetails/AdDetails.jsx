import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import Chat from '../Chat/Chat';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
const API_URL = 'http://localhost:5005';

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
    owner,
    handleDelete,
}) {
    let map;
    if (owner !== undefined) {
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

    const { user, setUser, getToken } = useContext(AuthContext);
    const [isChatVisible, setIsChatVisible] = React.useState(false);
    const handleCredit = async () => {
        if (user.credits < 1) {
            window.alert(
                'You are out of hangers, make a donation to earn more'
            );
            return;
        }
        const answer = window.confirm('Use 1 credit to contact this Hander');

        if (answer) {
            await axios.put(
                `${API_URL}/api/user/${user.id}`,
                { credits: user.credits - 1 },
                {
                    headers: { Authorization: `Bearer ${getToken()}` },
                }
            );
            setIsChatVisible(true);
            setUser({ ...user, credits: user.credits - 1 });
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
            <button onClick={handleDelete}>
                <i className="fa-solid fa-trash"></i>
            </button>

            {map}

            <button onClick={handleCredit}>Chat with owner</button>

            {isChatVisible ? (
                <Chat room={_id} username={user.username} />
            ) : null}
        </div>
    );
}

export default AdDetails;
