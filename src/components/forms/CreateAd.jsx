import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';

function CreateAd() {
    const navigate = useNavigate();

    const { user, getToken } = useContext(AuthContext);

<<<<<<< HEAD
    const [image, setImage] = useState("");
    //const [owner, setOwner] = useState('')
=======
    const [image, setImage] = useState('');
>>>>>>> edd0146 (wip)
    const [newAd, setNewAd] = useState({
        title: '',
        description: '',
        brand: '',
        size: '',
        category: '',
        condition: '',
        status: 'Available',
        city: 'Paris',
        image: '',
<<<<<<< HEAD
        owner: user.id
      })
=======
    });
>>>>>>> edd0146 (wip)

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

    const API_URL = 'http://localhost:5005';

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append('image', e.target.files[0]);

        axios
            .post(`${API_URL}/ads/upload`, uploadData, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((response) => {
                console.log(response);
                setImage(response.data.fileUrl);
            })
            .catch((err) =>
                console.log('Error while uploading the file: ', err)
            );
    };

    const handleSubmit = async (e) => {
        try {
<<<<<<< HEAD
          e.preventDefault();
          console.log(user)
          //setOwner(user)
          await axios.post(`${API_URL}/ads`, {...newAd, image}, {headers: { Authorization: `Bearer ${getToken()}` }})
          console.log(newAd)
          navigate("/ads")
        } catch (error) {
            console.log(error);
        }
      };
      
    
  return (
    <form className='new-ad-form' onSubmit={handleSubmit}>
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        name='title'
        value={newAd.title}
        onChange={handleChange}
      />

      <label htmlFor='description'>Description</label>
      <textarea
        type='text'
        rows="5" cols="30"
        minLength="10" maxLength="400"
        name='description'
        value={newAd.description}
        onChange={handleChange}
      />

    <label htmlFor='brand'>Brand</label>
      <input
        type='text'
        name='brand'
        value={newAd.brand}
        onChange={handleChange}
      />

      <label htmlFor='size'>Size</label>
      <select name="size" onChange={handleChange} value={newAd.size}>
        <option value="">--</option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>

      <label htmlFor='category'>Category</label>
      <select name="category" onChange={handleChange} value={newAd.category}>
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
    
      <label htmlFor='condition'>Condition</label>
      <select name="condition" onChange={handleChange} value={newAd.condition}>
        <option value="">--</option>
        <option value="Brand New">Brand New</option>
        <option value="Like New">Like New</option>
        <option value="Good Condition">Good Condition</option>
        <option value="Worn">Worn</option>
        <option value="Broken">Broken</option>
      </select>

      <input name='owner' type='text' value={newAd.owner} readOnly hidden/>

      <input name='image' type="file" onChange={handleFileUpload} />

      <button type="submit">Create</button>
    </form>
  )
=======
            e.preventDefault();
            console.log(newAd);
            await axios.post(
                `${API_URL}/ads`,
                { ...newAd, image },
                { headers: { Authorization: `Bearer ${getToken()}` } }
            );
            console.log(newAd);
            navigate('/ads');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="new-ad-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                name="title"
                value={newAd.title}
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
                value={newAd.description}
                onChange={handleChange}
            />

            <label htmlFor="brand">Brand</label>
            <input
                type="text"
                name="brand"
                value={newAd.brand}
                onChange={handleChange}
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

            <input name="image" type="file" onChange={handleFileUpload} />

            <button type="submit">Create</button>
        </form>
    );
>>>>>>> edd0146 (wip)
}

export default CreateAd;
