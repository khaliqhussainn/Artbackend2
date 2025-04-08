// src/middleware/adminOnly.js
const adminOnly = async (req, res, next) => {
    try {
      const user = req.user;
      
      if (!user) {
        return res.status(401).send({ error: "Authentication required" });
      }
      
      if (user.role !== "ADMIN") {
        return res.status(403).send({ error: "Access denied: Admin privileges required" });
      }
      
      next();
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };
  
  module.exports = adminOnly;