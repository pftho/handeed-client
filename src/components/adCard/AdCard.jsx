import {Link} from 'react-router-dom'

function AdCard({ _id, image, title, brand, size }) {
    return (
        <div className="ProjectCard card">
            <Link to={`/ads/${_id}`}>
                <img src={image} alt="" />
                <h3>{title}</h3>
                <p>{brand}</p>
                <p>{size}</p>
            </Link>
        </div>
    );
}

export default AdCard;