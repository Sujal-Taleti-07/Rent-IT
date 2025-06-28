const jwt = require("jsonwebtoken");

module.exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"]; // Use lowercase header key

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token part
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user info to request
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token." });
    }
}


module.exports.isAdmin = async (req, res, next) => {
    // Make sure req.user is populated by the previous middleware
    if (req.user && req.user.role === 'admin') {
      next();  // Continue to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'Permission denied' });
    }
}

