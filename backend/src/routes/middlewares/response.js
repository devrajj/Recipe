module.exports = (req, res, next) => {
  res.invalid = ({ msg }) =>
    res
      .status(200)
      .json({ ok: false, err: msg || "Invalid Parameters", data: null });

  res.failure = ({ msg }) =>
    res
      .status(200)
      .json({ ok: false, err: msg || "Something went wrong", data: null });

  res.success = ({ data = {} }) =>
    res.status(200).json({ ok: true, err: null, data });

  next();
};
