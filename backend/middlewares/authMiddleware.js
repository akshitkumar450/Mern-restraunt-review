import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  // console.log(req.headers);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization?.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "super-secret");
      // console.log(decoded);

      req.userId = decoded.id;
      next();
    } catch (err) {
      res.status(401).json({
        status: "fail",
        message: err.message,
      });
    }
  }
  if (!token) {
    console.log(" no auth");

    res.status(401).json({
      status: "fail",
      message: "not authorized ,no token",
    });
  }
};

export default protect;
