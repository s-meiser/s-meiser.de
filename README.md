### How to use?

#### 1. Möglichkeit - via docker und docker-compose
- gehe in das Verzeichnis wo auch die `docker-compose.yml` Datei liegt
- führe das hier aus => `docker-compose --env-file ./app/.env up --build`
- öffne `http://localhost/`

#### 2. Möglichkeit - via Symfony Local Web Server (https://symfony.com/doc/current/setup/symfony_server.html)
- gehe in das `APP` Verzeichnis
- führe das hier aus => `symfony server:start`
- öffne `http://127.0.0.1:8000/`

-----

#### How to develop?
Für die lokale Entwicklung, also alles was auf deinem Laptop oder PC unter dem Windows Betriebssystem passiert,
würde ich **Möglichkeit 2 - via Symfony Local Web Server** empfehlen
- unter Windows **wesentlich performanter** auch, wenn man einiges vorher installieren muss
  - https://scoop.sh/
  - `scoop install symfony-cli`
  - https://nodejs.org/en/
- unter Ubuntu eigentlich egal welche von den beiden Möglichkeiten ihr nutzt


- Wenn man über Docker entwickeln möchte, solltet ihr `yarn encore dev --watch` im Hintergrund
laufen lassen. Damit generiert ihr eure Assets (Bilder, Javascript Dateien, Css Dateien)
    - Falls in der `webpack.config.js` geändert wird, muss der Befehl `yarn encore dev --watch` erneut ausgeführt werden
- Hinweis: man kann auch anstelle von `yarn encore` den `webpack-dev-server` verwenden
  - `yarn encore dev-server`

#### How to deploy
- `composer dump-env prod`
- `composer install --no-dev --optimize-autoloader`
- `yarn run encore production`