const jwt = require('jsonwebtoken');

const LoginService = require('../services/LoginService');

const secret = 'secret';

const login = async (req, res) => {
  const user = req.body;
  const response = await LoginService.login(user);
  if (response.status !== 200) {
    return res.status(response.status).json({ message: response.message });
  }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { 
    email: user.email, 
    password: user.password } }, secret, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = {
  login,
};
