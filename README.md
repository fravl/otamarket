# OtaMarket

## Local development with docker compose

This requires a local Docker environment and a Docker Compose version 2.22 and later.

1. Navigate to root
2. Run the following

```sh
docker compose watch

```

This will spin up both the frontend (port 5173) and the backend (port 8080) with hot reloading enabled.

To stop the application run

```sh
docker compose down

```

If you prefer to run the application without hot reloading, you can use the following command instead:

```sh
docker compose up

```

## Local development without docker compose

### Frontend

1. Navigate to packages/frontend
2. Run the following


```sh
npm run dev

```
### Backend

1. Navigate to packages/backend
2. Run the following


```sh
npm run dev

```

