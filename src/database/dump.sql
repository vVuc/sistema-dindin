CREATE DATABASE dindin;

CREATE TABLE usuarios
(
    id    SERIAL PRIMARY KEY,
    nome  VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha CHAR(60)     NOT NULL
);



CREATE TABLE categorias
(
    id        SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
);

CREATE TABLE transacoes
(
    id           SERIAL PRIMARY KEY,
    tipo         TEXT      NOT NULL,
    descricao    TEXT      NOT NULL,
    valor        INTEGER   NOT NULL,
    data         TIMESTAMP NOT NULL,
    usuario_id   INTEGER   NOT NULL REFERENCES usuarios (id),
    categoria_id INTEGER   NOT NULL REFERENCES categorias (id)
);

