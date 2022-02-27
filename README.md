
# Blogs API

Uma API para CRUD de um blog

## Stack utilizada

**Back-end:** Node, Express, Sequelize


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`MYSQL_USER`

`MYSQL_PASSWORD`

`HOSTNAME`


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/paulorenan/blogs-api.git
```

Entre no diretório do projeto

```bash
  cd blogs-api
```

Instale as dependências

```bash
  npm install
```
Inicie o sequelize
```bash
  npm run prestart
```

Inicie o servidor

```bash
  npm run start
```


## Documentação da API

#### Cria um usuario e retorna um token de autenticação

```http
  POST /user
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `displayName` | `string` | **Obrigatório**. O nome do usuario |
| `email` | `string` | **Obrigatório**. O email do usuario |
| `password` | `string` | **Obrigatório**. A senha do usuario |
| `image` | `string` | **Obrigatório**. A imagem do usuario |

#### Lista todos os usuarios

```http
  GET /user
```
#### Lista um usuario

```http
  GET /user/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuario |


#### Deleta o seu usuario

```http
  DELETE /user/me
```

#### Faz o login e retorna um token de autenticação

```http
  POST /login
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. O email do usuario |
| `password` | `string` | **Obrigatório**. A senha do usuario |

#### Adiciona uma categoria

```http
  POST /categories
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. O nome da categoria |

#### Lista todos as categorias

```http
  GET /categories
```
#### Adiciona um Post no blog

```http
  POST /post
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Obrigatório**. O titulo do post |
| `content` | `string` | **Obrigatório**. O conteudo do post |
| `categoryIds` | `Array number` | **Obrigatório**. As categorias do post |

#### Lista todos os posts

```http
  GET /post
```
#### Lista um post

```http
  GET /post/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do post |

#### Atualiza um post

```http
  PUT /post/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do post |
| `title` | `string` | **Obrigatório**. O titulo do post |
| `content` | `string` | **Obrigatório**. O conteudo do post |

#### Deleta um post

```http
  DELETE /post/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do post |

#### Deleta o seu usuario

```http
  DELETE /user/me
```
