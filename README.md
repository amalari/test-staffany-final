## Getting started

Before install module, please check pnpm installed or you can run code below to install pnpm globally.

```bash
> npm install -g yarn
```

## Dockerizing

If you want to running inside docker you can run with these command:

```bash
# serve all backend and frontend served in localhost:8080
> docker compose up -d
```

## Without Docker
### Backend
```bash
# setting env
> cd backend
> cp env.example .env
```

fill your .env settings with these
```
PORT="3000"

DB_HOST="localhost"
DB_PORT="5432"
DB_USERNAME="<your postgres username>"
DB_PASSWORD="<your postgres password>"
DB_NAME="<your db name>"
```

```bash
# install dependencies
> yarn install --frozen-lock --force
> yarn migrate
# serve with hot reload at localhost:3000
> yarn dev
```

### Frontend
```bash
# setting env
> cd frontend
> cp env.example .env
```

fill your .env settings with these
```
PORT=8080
REACT_APP_API_BASE_URL="http://localhost:3000/api/v1"
```

```bash
# install dependencies
> yarn install --frozen-lock --force
# serve with hot reload at localhost:8080
> yarn start
```

