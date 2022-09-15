import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import './AdForms.css';

function UpdateAd() {
    const { user, getToken } = useContext(AuthContext);

    const [image, setImage] = useState('');
    const [adToUpdate, setAdToUpdate] = useState({
        title: '',
        description: '',
        brand: '',
        size: '',
        category: '',
        condition: '',
        status: 'Available',
        owner: user,
        city: '',
        image: '',
    });

    const { adId } = useParams();
    const navigate = useNavigate();

    const getAdToUpdate = async () => {
        const API_URL = 'http://localhost:5005';
        const response = await axios.get(`${API_URL}/ads/${adId}`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        setAdToUpdate(response.data);
        setImage(response.data.image);
    };

    useEffect(() => {
        try {
            getAdToUpdate();
        } catch (error) {
            console.log(error);
        }
    }, [adId]);

    if (user === null) {
        return null;
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setAdToUpdate({
            ...adToUpdate,
            [name]: value,
        });
    };

    const API_URL = 'http://localhost:5005';

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append('image', e.target.files[0]);

        axios
            .post(`${API_URL}/ads/upload`, uploadData, {
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
            await axios.put(
                `${API_URL}/ads/${adId}/edit`,
                { ...adToUpdate, image },
                { headers: { Authorization: `Bearer ${getToken()}` } }
            );
            navigate(`/ads/${adId}`);
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
                    value={adToUpdate.title}
                    onChange={handleChange}
                   
                />

                <label htmlFor="description">Description</label>
                <textarea
                    type="text"
                    rows="5"
                    cols="30"
                    minLength="10"
                    maxLength="400"
                    name="description"
                    value={adToUpdate.description}
                    onChange={handleChange}
                />

                <label htmlFor="brand">Brand</label>
                <input
                    type="text"
                    name="brand"
                    value={adToUpdate.brand}
                    onChange={handleChange}
                />

                <label htmlFor="size">Size</label>
                <select
                    name="size"
                    onChange={handleChange}
                    value={adToUpdate.size}
                >
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
                    value={adToUpdate.category}
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
                    value={adToUpdate.condition}
                >
                    <option value="">--</option>
                    <option value="Brand New">Brand New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good Condition">Good Condition</option>
                    <option value="Worn">Worn</option>
                    <option value="Broken">Broken</option>
                </select>

                <img src={image || adToUpdate.image} alt="" width={100} />
                <input name="image" type="file" onChange={handleFileUpload} />

                <button type="submit">Save changes</button>
            </form>
        </div>
    );
}

export default UpdateAd;
