import ApiError from '../exceptions/apiError.js'

const errorMiddlware = (err, req, res, next) => {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error =
    req.app.get('env') === 'development'
      ? err
      : {};

  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        errors: err.errors,
      })
  }

  return res
    .status(err.status || 500)
    .json({
      status: err.status,
      message: 'Непредвиденная ошибка', // message: err.message
      errors: err.errors,
    })
}

export default errorMiddlware