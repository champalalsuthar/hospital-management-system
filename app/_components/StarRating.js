import { useState } from 'react';

const StarRating = ({ rating }) => {
    const [filledStars] = useState(rating);

    const getStarType = (index) => {
        // Calculate the integer and decimal part of the rating
        const fullStars = Math.floor(filledStars); // Integer part
        const decimalPart = filledStars - fullStars; // Decimal part

        if (index < fullStars) {
            return 'full'; // Full star
        } else if (index === fullStars && decimalPart >= 0.1 && decimalPart <= 0.5) {
            return 'half'; // Half star
        } else if (index === fullStars && decimalPart > 0.5) {
            return 'full'; // Round up to a full star
        } else {
            return 'empty'; // Empty star
        }
    };

    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => {
                const starType = getStarType(index);

                return (
                    <span
                        key={index}
                        className={`text-3xl ${starType === 'full'
                            ? 'text-yellow-400'
                            : starType === 'half'
                                ? 'text-yellow-400'
                                : 'text-white'
                            }`}
                    >
                        {starType === 'half' ? '★' : '★'}
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;


// import { useState } from 'react';

// const StarRating = ({ rating }) => {
//     const [filledStars, setFilledStars] = useState(rating);

//     return (
//         <div className="flex">
//             {[...Array(5)].map((_, index) => (
//                 <span
//                     key={index}
//                     className={`text-3xl ${index < filledStars ? 'text-yellow-400' : 'text-white '
//                         }`}
//                 // onClick={() => setFilledStars(index + 1)}
//                 >
//                     ★
//                 </span>
//             ))}
//         </div>
//     );
// };

// export default StarRating;
