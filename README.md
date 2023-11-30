# OtaMarket

## Local development with docker compose

This requires a local Docker environment and a Docker Compose version 2.22 and later.

1. Navigate to root
2. Run the following

```sh
npm run dev

```

This will spin up both the frontend (port 5173) and the backend (port 8080) with hot reloading enabled.

If you want to view logs while running the application, open another terminal and run:

```sh
npm run logs

```

To stop the application run

```sh
docker compose down

```


## Local development without docker compose

Local development without docker compose is discouraged. You will have to set up your own local PostgreSQL database and connect it to the backend yourself.

### Frontend

1. Navigate to packages/frontend
2. Run the following

```sh
npm ci

```
and
```sh
npm run dev

```
### Backend

1. Navigate to packages/backend
2. Run the following

```sh
npm ci

```
and
```sh
npm run dev

```

