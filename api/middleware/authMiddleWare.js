const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // 1. Get the token from the request header
    const token = req.header('Authorization');

    // 2. If no token, deny access
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // 3. Verify the token using your secret key
        // Note: Tokens usually come as "Bearer <token_string>", so we split it
        const actualToken = token.split(" ")[1]; 
        
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.user = decoded; // Attach the user ID to the request
        next(); // Move to the next function
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};