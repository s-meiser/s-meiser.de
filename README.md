Installation
------------

###### 1st option - via Docker and Docker-Compose
- go to the directory where the `docker-compose.yml` file is located
- execute `docker-compose --env-file ./app/.env up --build`
- remove old built assets `rm -rf ./app/public/build/ `
- to build assets _[Nodejs is required]_ `cd ./app && yarn encore dev --watch`
- opel url `http://localhost:5546/`

###### 2nd option - via Symfony Local Web Server (https://symfony.com/doc/current/setup/symfony_server.html)
- go to the directory `APP`
- execute `symfony server:start`
- opel url `http://127.0.0.1:8000/`


Issues / Bugs / Features
---------------
You can find all documented errors / bugs or features in my issue board
- https://github.com/s-meiser/s-meiser.de/issues