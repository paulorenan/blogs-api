const { User } = require('../models');

// https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
const validarEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  if (email === undefined) {
    return { status: 400, message: '"email" is required' };
  }
  if (email === '') {
    return { status: 400, message: '"email" is not allowed to be empty' };
  }
  if (!re.test(email)) {
    return { status: 400, message: '"email" must be a valid email' };
  }
  return { status: 200, message: 'OK' };
};

const validarSenha = (senha) => {
  if (senha === undefined) {
    return { status: 400, message: '"password" is required' };
  }
  if (senha === '') {
    return { status: 400, message: '"password" is not allowed to be empty' };
  }
  if (senha.length !== 6) {
    return { status: 400, message: '"password" length must be 6 characters long' };
  }
  return { status: 200, message: 'OK' };
};

const validações = (email, password) => {
  if (validarEmail(email).status !== 200) return validarEmail(email);
  if (validarSenha(password).status !== 200) return validarSenha(password);
  return { status: 200, message: 'OK' };
};

const login = async (user) => {
  try {
    const { email, password } = user;
    const response = validações(email, password);
    if (response.status !== 200) return response;
    const usuario = await User.findOne({ where: { email, password } });
    if (!usuario) return { status: 400, message: 'Invalid fields' };
    if (usuario.password !== password) return { status: 400, message: 'Invalid password' };
    return { status: 200, message: 'OK' };
  } catch (error) {
    console.log(error);
    return { status: 500, message: error.message };
  }
};

module.exports = {
  login,
};