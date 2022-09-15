import { Link } from 'react-router-dom';
import './AdCard.css';

function AdCard({ _id, image, title, brand, size }) {
    return (
        <Link to={`/ads/${_id}`}>
            <div className="ad-card">
                <img src={image} alt="" className="ad-card-img"  />
                <div className="ad-card-content">
                    <h3>{title}</h3>
                    <p>{brand}</p>
                    <p>{size}</p>
                </div>
            </div>
        </Link>
    );
}

export default AdCard;
