const verifyAdmin = async (req, res, next) => {
  try {
    const role = req.user.role;
    console.log(role);

    if (role !== "admin") {
      return res.send({
        status: "error",
        message: "Access denied. Admins only.",
      });
    }
    next();
  } catch (error) {
    next(err);
  }
};

export default verifyAdmin;