// const jwt = require("jsonwebtoken");

// // const SECRET_KEY = "jnaswxyzuytabcdefopqurastuvghijklmndiuaÂ®@z9ujknwejhyiueywqjhweui";
// const SECRET_KEY = "04425ec63ebba1cf24e5b5bf3ae38f3220c873bbce8cc0106ff4a94170b81a5203459bc001e605b195c52eaac15184032eed29f4f505bd96b096f90f9aca3f83";
// const generateToken = (userId) => {
//     const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
//     return token;
// };


// const getUserIdFromToken = (token) => {
//     const decodedToken = jwt.verify(token, SECRET_KEY);
//     return decodedToken.userId;
// };

// module.exports = { generateToken, getUserIdFromToken};



// Update src/config/jwtProvider.js
const jwt = require("jsonwebtoken");

// Use environment variable or fallback to a development secret key
const SECRET_KEY = process.env.JWT_SECRET || "developmentSecretKeyDoNotUseInProduction";

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
    return token;
};

const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken.userId;
};

module.exports = { generateToken, getUserIdFromToken };