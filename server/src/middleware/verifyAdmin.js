function verifyAdmin (req, res) {
  if(req.admin === 'false' ) {
    return res
      .status(400)
      .json({
        msg: 'This user is not an administrator',
      });
  };
}

module.exports = verifyAdmin;