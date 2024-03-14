
import { useState } from 'react';

const StarRating = ({ rating }) => {
    const [filledStars, setFilledStars] = useState(rating);

    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    className={`text-3xl ${index < filledStars ? 'text-yellow-400' : 'text-white '
                        }`}
                // onClick={() => setFilledStars(index + 1)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
