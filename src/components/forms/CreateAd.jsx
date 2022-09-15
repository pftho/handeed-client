import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import './Adforms.css';

function CreateAd() {
    const navigate = useNavigate();
    const { user, getToken, setUser } = useContext(AuthContext);
    const [image, setImage] = useState('');

    const [newAd, setNewAd] = useState({
        title: '',
        description: '',
        brand: '',
        size: '',
        category: '',
        condition: '',
        status: 'Available',
        image: '',
        owner: user.id,
    });

    if (user === null) {
        return null;
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setNewAd({
            ...newAd,
            [name]: value,
        });
    };

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append('image', e.target.files[0]);

        axios
            .post(`${API_URL}/api/ads/upload`, uploadData, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((response) => {
                setImage(response.data.fileUrl);
            })
            .catch((err) =>
                console.log('Error while uploading the file: ', err)
            );
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(
                `${API_URL}/api/ads`,
                { ...newAd, image },
                { headers: { Authorization: `Bearer ${getToken()}` } }
            );
            user.ads.push(response.data._id);

            const updatedUser = await axios.get(
                `${API_URL}/api/profile/user/${user.id}`,
                {
                    headers: { Authorization: `Bearer ${getToken()}` },
                }
            );

            setUser(updatedUser.data);
            navigate('/ads');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="form-container">
            <form className="new-ad-form" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={newAd.title}
                    onChange={handleChange}
                    placeholder="E.g. dress, top, pants..."
                />

                <label htmlFor="description">Description</label>
                <textarea
                    type="text"
                    rows="5"
                    cols="30"
                    minLength="10"
                    maxLength="400"
                    name="description"
                    value={newAd.description}
                    onChange={handleChange}
                    placeholder="E.g. Black dress, to collect between 2pm and 4pm. Give as many details as possible (on the color, size etc.) to increase your chances of giving your clothe"
                />

                <label htmlFor="brand">Brand</label>
                <input
                    type="text"
                    name="brand"
                    value={newAd.brand}
                    onChange={handleChange}
                    placeholder="E.g.Zara"
                />

                <label htmlFor="size">Size</label>
                <select name="size" onChange={handleChange} value={newAd.size}>
                    <option value="">--</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>

                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    onChange={handleChange}
                    value={newAd.category}
                >
                    <option value="">--</option>
                    <option value="Accessory">Accessory</option>
                    <option value="Bag">Bag</option>
                    <option value="Coat">Coat</option>
                    <option value="Dress">Dress</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Pyjamas">Pyjamas</option>
                    <option value="Shorts">Shorts</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Skirt">Skirt</option>
                    <option value="Sport">Sport</option>
                    <option value="Sweater">Sweater</option>
                    <option value="Top">Top</option>
                    <option value="Trousers">Trousers</option>
                    <option value="Underwear">Underwear</option>
                    <option value="Other">Other</option>
                </select>

                <label htmlFor="condition">Condition</label>
                <select
                    name="condition"
                    onChange={handleChange}
                    value={newAd.condition}
                >
                    <option value="">--</option>
                    <option value="Brand New">Brand New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good Condition">Good Condition</option>
                    <option value="Worn">Worn</option>
                    <option value="Broken">Broken</option>
                </select>

                <input
                    name="owner"
                    type="text"
                    value={newAd.owner}
                    readOnly
                    hidden
                />

                <input
                    className="file-input-btn"
                    name="image"
                    type="file"
                    onChange={handleFileUpload}
                />

                <button className="submit-form-btn" type="submit">
                    Create
                </button>
            </form>
        </div>
    );
}

export default CreateAd;
