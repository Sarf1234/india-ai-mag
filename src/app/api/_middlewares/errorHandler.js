export function errorHandler(handler) {
  return async function (req, res) {
    try {
      return await handler(req, res);
    } catch (error) {
      console.error("🔥 API Error:", error);

      // Zod validation error
      if (error.name === "ZodError") {
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        });
      }

      // Mongo duplicate key error (slug, name)
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return res.status(400).json({
          status: "error",
          message: `${field} must be unique`,
        });
      }

      // Custom thrown errors
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
      }

      // Fallback
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };
}
