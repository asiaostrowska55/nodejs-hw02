const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    req.user = user;

    if (user.verificationToken !== "null") {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Email was not confirmed.",
        data: "Unauthorized",
      });
    }

    next();
  })(req, res, next);
};

module.exports = { auth };
