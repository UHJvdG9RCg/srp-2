## Description

Demo app for crating shor links.

## Installation

```bash
$ npm ci
```

## Running the app

```bash
$ docker compose up -d
```


```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Performance optimization and TODO

- [ ] Add Redis and worker threads. Extract hash generation to worker thread to offload event loop. 
        Generate unique aliases in advance and push them to Redis. 
        On `/shorten` request take a unique alias from Redis (generate in case no aliases left)
- [ ] Extract analytics into separate table. Add new records on each request made.
- [ ] Add cron job to aggregate analytics data for past periods.
- [ ] Add caching for frequently used redirects
- [ ] Add Swagger API reference 
- [ ] Add optimised `Dockerfile` and `extend docker-compose.yml`
- [ ] Add DB migration flow
