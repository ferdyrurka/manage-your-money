# Manage your money

- Final project for universities
- The project was created to get to know GraphQL, API Platform, Angular
- The project contains a strange solution because I was doing various tests. **This project should not be taken as a best practice!**

## TODO:

- [ ] refactoring endpoint for receive all data for model (current is find all and receive redundant data)
- [ ] tests graphql mutations (refactoring from save in api platform endpoint to graphql)

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
  
  symfony console messenger:consume async
```

## Run local app

### Install

```shell
  yarn install
```

### Run

```shell
  yarn start
```

## Author

- [Łukasz Staniszewski](https://lukaszstaniszewski.pl) <[kontakt@lukaszstaniszewski.pl](mailto:kontakt@lukaszstaniszewski.pl)>
