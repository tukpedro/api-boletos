<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>

</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

API que faz leitura de Linhas Digitáveis de Título e de Convênio, retornando os dados:

<ul>
<li>Código de Barras</li>
<li>Valor</li>
<li>Vencimento</li>
</ul>

## Título

```json
21290.00119 21100.012109 04475.617405 9 75870000002000
```
## Convênio

```json
84880000001-9 44040158202-1 20210142823-4 10100712122-3
```
## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn dev
```

## Request

```http
localhost:8080/boleto/<linhaDigitavel>
```
## Response

```json
{
    "barCode": "xxxxxxxxxxxxxx",
    "amount": "xxx.xx",
    "expirationDate": "xx/xx/xxxx"
}
```
## Stay in touch

- Author - [Pedro Pastuk](https://github.com/tukpedro)
## License

Nest is [MIT licensed](LICENSE).
