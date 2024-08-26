# Backend Challenge REST API Open Food Facts

## Introdução

Nesse desafio trabalharemos no desenvolvimento de uma REST API para utilizar os dados do projeto Open Food Facts, que é um banco de dados aberto com informação nutricional de diversos produtos alimentícios.

O projeto tem como objetivo dar suporte a equipe de nutricionistas da empresa Fitness Foods LC para que eles possam revisar de maneira rápida a informação nutricional dos alimentos que os usuários publicam pela aplicação móvel.

### Stack utilizado
 
- NodeJS
- MongoDB com Mongoose

## Como utilizar
 
- Clonar o projeto
- Ir na pasta Docker e rodar o comando:
```bash
docker-compose --profile production up --build
```
- Alternativamente, para rodar em ambiente dev:
```bash
docker-compose --profile development up --build
```

### Endpoints:

 - `PUT /products/:code`: Será responsável por receber atualizações do Projeto Web
 - `DELETE /products/:code`: Mudar o status do produto para `trash`
 - `GET /products/:code`: Obter a informação somente de um produto da base de dados
 - `GET /products`: Listar todos os produtos da base de dados, adicionar sistema de paginação para não sobrecarregar o `REQUEST`.

Um sistema CRON está programado para buscar e atualizar a base de dados todo dia à meia noite.



### Modelo de Dados:

Para a definição do modelo, consultar o arquivo [products.json](./products.json) que foi exportado do Open Food Facts, um detalhe importante é que temos dois campos personalizados para poder fazer o controle interno do sistema e que deverão ser aplicados em todos os alimentos no momento da importação, os campos são:

- `imported_t`: campo do tipo Date com a dia e hora que foi importado;
- `status`: campo do tipo Enum com os possíveis valores draft, trash e published;

>  This is a challenge by [Coodesh](https://coodesh.com/)
