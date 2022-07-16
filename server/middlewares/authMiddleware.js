import passport from 'passport'
// authenticateToken
const auth = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res
        .status(401)
        .json({
          status: 'error',
          code: 401,
          message: 'Unauthorized. Passport error. Probably token is out of date. Or not set in Header',
        });
    }
    req.user = user
    next();
  })(req, res, next);
}

export default auth 