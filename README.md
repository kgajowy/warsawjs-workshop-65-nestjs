⚠️⚠️⚠️

Please do not look into `workshop-step-ready` unless you want to be bored during workshop ;)

⚠️⚠️⚠️

# Workshop

```
To grupa dla Ciebie jeżeli..

* znasz już (conajmniej!) podstawy NestJS
* TypeScript nie jest dla Ciebie przeszkodą
* nie jest Ci straszny koncept Dependency Injection
* szukasz praktycznych zastosowań NestJS poza architekturą trójwarstwową
* chcesz poznać podstawy projektowania feature i umożliwienia sprawnej, równoległej pracy swojemu zespołowi
* wiedzieć, jak zacząć tworzyć building-blocks oraz poznać podstawy wydzielania domeny

## Co nas czeka?

Krok po kroku będziemy budować warstwy oprogramowania realizujący potrzeby biznesowe z domeny “Compliance & Risk” -
real-life example w uproszczonej wersji. Zbierzemy podstawowe informacje w celu zbudowania i wydzielenia naszej domeny,
czyli zestawu najważniejszych decyzji, które staną się sercem naszego mini-projektu. Nauczymy się, jak zapewnić krew do
jego funkcjonowania (baza danych, zdarzenia…) - by finalnie odkryć, że zbudowaliśmy “plaster miodu”.
Czego nie uświadczysz?

* Pisania CRUDa
* Autoryzacji/Autentykacji
* wykładu o SOLID - zakładamy, że mamy go już w sercu ;)
```

# Setup Instructions

1. install [https://www.docker.com/](https://www.docker.com/)
2. install nvm `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
3. install LTS node `nvm install --lts`
4. install NestJS CLI `npm install -g @nestjs/cli`
5. clone
   repo `git clone [https://github.com/kgajowy/warsawjs-workshop-65-nestjs.git](https://github.com/kgajowy/warsawjs-workshop-65-nestjs.git)`
6. run `npm i`
7. run docker for Postgres DB: `docker compose up`
8. execute migrations `npm run typeorm:run`
9. in another terminal, run `npm run start:dev`

For some cases, we will be running REPL ` npm run start -- --entryFile repl` (usually without watch) to imitate
controllers
;)

Let's test if everything works as expected:

* Run in REPL mode
* execute `await get(UsersService).create('warsaw-js')`
* execute `await get(UsersService).find('uuid-returned-from-above')`

## DB Migrations

Generate:

```
npm run typeorm:generate ./src/migrations/MigrationName
```

Run:

```
npm run typeorm:run
```
