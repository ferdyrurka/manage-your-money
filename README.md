# Manage your money

- Final project for universities
- The project was created to get to know GraphQL and API Platform

## Requirements

| Name           | Version       |
| -------------- |:-------------:|
| docker         | 19.03         |
| docker-compose | 1.25          |
| php            | 8.0           |
| yarn           | 1.22          |
| node           | 14.16         |
| composer       | 2             |
| npm            | 6.14          |
| symfony cli    | 4.23          |

Required php ext:

- mbstring
- xml
- pdo
- intl
- mysql

## Install & Run local api

### Install

```shell
  symfony composer install
```

### Run

```shell
  docker-compose up -d
    
  symfony server:start -d
```

## Run local app

### Install

```shell
  yarn install
```

### Run

```shell
    npm run start
```

## Author

- [Łukasz Staniszewski](https://lukaszstaniszewski.pl) <[kontakt@lukaszstaniszewski.pl](mailto:kontakt@lukaszstaniszewski.pl)>
