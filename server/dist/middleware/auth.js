import jwt from "jsonwebtoken";
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // attach to request
        req.user = { username: payload.username };
        return next();
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
