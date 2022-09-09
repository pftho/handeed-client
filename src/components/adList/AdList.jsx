import React, { useEffect, useState } from 'react'
import AdCard from '../adCard/AdCard'
import axios from "axios";

function AdList() {
    
    const [ads, setAds] = useState([])
    
    const getAds = async () => {
        const API_URL = 'http://localhost:5005'
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/ads`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        console.log(response)
        setAds(response.data)
    }

    useEffect(() => {
        try {
            getAds()
        } catch (error) {
          console.log(error)
        }
      }, []);

  return (
    <div className='ads-list'>
        {ads.map(ad => <AdCard key={ad._id} {...ad}/>)}
    </div>
  )
}

export default AdList