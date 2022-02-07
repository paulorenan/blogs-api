const { User } = require('../models');

const validarNome = (nome) => {
  if (nome.length < 8) {
    return { status: 400, message: '"displayName" length must be at least 8 characters long' };
  }
  return { status: 200, message: 'OK' };
};

// https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
const validarEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  if (!email) {
    return { status: 400, message: '"email" is required' };
  }
  if (!re.test(email)) {
    return { status: 400, message: '"email" must be a valid email' };
  }
  return { status: 200, message: 'OK' };
};

const validarSenha = (senha) => {
  if (!senha) {
    return { status: 400, message: '"password" is required' };
  }
  if (senha.length !== 6) {
    return { status: 400, message: '"password" length must be 6 characters long' };
  }
  return { status: 200, message: 'OK' };
};

const validações = (displayName, email, password) => {
  if (validarNome(displayName).status !== 200) return validarNome(displayName);
  if (validarEmail(email).status !== 200) return validarEmail(email);
  if (validarSenha(password).status !== 200) return validarSenha(password);
  return { status: 200, message: 'OK' };
};

const adicionarUsuario = async (user) => {
  try { 
    const { displayName, email, password } = user;
    const response = validações(displayName, email, password);
    if (response.status !== 200) return response;
    const duplicado = await User.findOne({ where: { email } });
    console.log(duplicado);
    if (duplicado) return { status: 409, message: 'User already registered' };
    await User.create(user);
    return { status: 200, message: 'OK' };
  } catch (error) {
    console.log(error);
    return { status: 500, message: error.message };
  }
};

const pegarUsuarios = async () => {
  try {
    const usuarios = await User.findAll();
    return usuarios;
  } catch (error) {
    console.log(error);
    return { status: 500, message: error.message };
  }
};

module.exports = {
  validarNome,
  adicionarUsuario,
  pegarUsuarios,
};