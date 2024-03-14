import jwt from 'jsonwebtoken';

export const validateToken = (token) => {
    try {
        // Verify the token using the secret key
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // If the token is valid, return the decoded data
        return decodedToken;
    } catch (error) {
        // If the token is invalid or expired, return null
        return null;
    }
};