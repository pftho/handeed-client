import React from 'react';
import { Link } from 'react-router-dom';
import LandingCard from '../../components/landingCard/LandingCard';
import check from '../../assets/check.png'
import list from '../../assets/list.png'
import shake from '../../assets/shake.png'
import './LandingPage.css';

function LandingPage() {
    const gettingStarted = [
        {
            step: '1. Build a trusted profile',
            description:
                "Add your profile picture and verify your account to show you’re a real person. You'll soon be able to update your info in your profile...feature coming out later :p",
            img: check
        },
        {
            step: '2. List your items',
            description:
                "Find out what you can give on Handeed. Add a few nice, clear picture of the item. Be specific and honest in the item's description. The nice thing is that for each item given, you'll receive 2 Dresses.",
                img: list
            },
        {
            step: "3. If you're interested in another Handeer's item",
            description:
                "Press 'Chat with Owner' to clear up any questions about the item - it'll cost you 1 Dress. After you're done discussing the details with the owner, you can eventually arrange an appointment with them!",
                img: shake
            },
    ];

    return (
        <div className="landing-page">
            <div className="landing-hero-wrapper">
                <div className="landing-hero">
                    <h1>Welcome to Handeed</h1>
                    <h2>Ready to declutter your wardrobe?</h2>
                    <Link to="/auth/signup" className="button">
                        Start giving now!
                    </Link>
                    <Link to="/ads" className="view-catalogue button">
                        View catalogue <i class="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
            <div className="getting-started">
                <h2>Getting started</h2>
                <p>
                    To have a safe and successful selling experience on Handeed,
                    nothing more simple - simply follow these tips:
                </p>

                <div className="landing-cards">
                    {gettingStarted.map(({ step, description, img }) => (
                        <LandingCard step={step} description={description} img={img} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
