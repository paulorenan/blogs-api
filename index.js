const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('./controller/UserController');
const LoginController = require('./controller/LoginController');
const CategoriesController = require('./controller/CategoriesController');
const BlogPostController = require('./controller/BlogPostController');

const app = express();

app.use(bodyParser.json());

app.get('/user', UserController.pegarUsuarios);
app.get('/user/:id', UserController.pegarUsuarioId);
app.post('/user', UserController.adicionarUsuario);

app.post('/login', LoginController.login);

app.get('/categories', CategoriesController.pegarCategorias);
app.post('/categories', CategoriesController.cadastrarCategoria);

app.get('/post', BlogPostController.pegarPosts);
app.get('/post/:id', BlogPostController.pegarPostId);
app.post('/post', BlogPostController.adicionarPost);
app.put('/post/:id', BlogPostController.editarPost);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
