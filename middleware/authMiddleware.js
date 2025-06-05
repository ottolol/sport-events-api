const jwt = require("jsonwebtoken");

exports.ensureAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Требуется авторизация" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: "Доступ запрещён" });
    }
  } catch (err) {
    res.status(401).json({ error: "Недействительный токен" });
  }
};
