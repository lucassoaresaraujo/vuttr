# VUTTR

VUTTR  (Very Useful Tools to Remember) é um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags.

![build master](https://travis-ci.com/lucassoaresaraujo/vuttr.svg?branch=master)

## Pré-requisitos

O que você precisa para instalar o software:

#### [Node](https://nodejs.org/en/download/)

```
Node v10.15.x
```

#### [Yarn](https://yarnpkg.com/lang/pt-br/docs/install/#debian-stable)

> Caso deseje, você poderá usar os comandos equivalentes no NPM

#### [PostgreSQL](https://www.postgresql.org/download/)

Recomenda-se instalação via docker com o comando abaixo:
```
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
#### [Redis](https://redis.io/download)

Recomenda-se instalação via docker com o comando abaixo:
```
docker run --name redis -p 6379:6379 -d -t redis:alpine
```
## Instalação

As etapas abaixo ajudarão você a instalar e configurar o VUTTR corretamente

#### 1. Baixe o projeto

```
git clone https://github.com/lucassoaresaraujo/vuttr.git
```

#### 2. Instale as bibliotecas do projeto

Dentro da pasta do projeto rode o seguinte comando:
```
yarn
```
#### 3. Criação do banco de dados

No postgres, crie o banco de dados para aplicação

#### 4. Configuração do .env

Na raiz do projeto, crie um novo arquivo chamado `.env` e copie o conteúdo do arquivo `.env.example` para dentro dele.

Ajuste as configuraçes do Postgres e Redis, por exemplo:

```
# Database
DB_HOST=localhost
DB_USER=postgres
DB_PASS=docker
DB_NAME=<insira aqui o nome do banco de dados criado no passo anterior>
DB_PORT=5432

# REDIS
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```
#### 5. Criação da estrutura do banco de dados

```
yarn sequelize db:migrate
```

#### 6. Colocando a aplicação para rodar em modo de desenvolvimento

```
yarn dev
```

#### Para deploy em produção:
```
yarn build
yarn start
```

## Rodando os testes

Certifique-se de possuir o Redis instalado e configurado no arquivo `.env.test`:
```
#REDIS
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

Execute o seguinte comando para realizar os testes:

```
yarn test
```
> Para realizar os testes, certifique-se que o servidor não esteja iniciado

> O arquivo `/__tests__/coverage/lcov-report/index.html` possui detalhamentos da cobertura dos testes

## Documentação

No diretório `docs`encontra-se o arquivo `index.html` com a documentaço da API.

> Em ambiente de desenvolvimento você poderá acessá-la através do seguinte endereço: `http://localhost:3000/`

Para alterar a documentação utilize o arquivo '/docs/api.apib'.
> Para atualizar o arquivo `/docs/index.html` instale o [Aglio](https://github.com/danielgtaylor/aglio) e, dentro do diretório `docs`, execute o seguinte comando:
> ```
> aglio -i api.apib --theme-full-width --no-theme-condense -o index.html
> ```
