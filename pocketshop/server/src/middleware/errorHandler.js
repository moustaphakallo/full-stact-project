export const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];

    return res.status(409).json({
      message: `${field} already exists`,
    });
  }

  const status = error.statusCode || 500;

  res.status(status).json({
    message: error.message || String(error) || "Server error",
  });
};