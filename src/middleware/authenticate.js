// middleware/authenticate.js
const jwtProvider = require("../config/jwtProvider.js");
const userService = require("../service/userService.js");

// Fix in src/middleware/authenticate.js
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send({ error: "Token not found" });
        }

        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await userService.findUserById(userId); // Need to await here
        
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Authentication failed: " + error.message });
    }
};

module.exports = authenticate;