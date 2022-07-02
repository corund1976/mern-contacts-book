const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res
      .status(401)
      .json({
        status: 'error',
        code: 401,
        message: 'Unauthorized',
      })
  }

  next()
}

export default authorizeAdmin 