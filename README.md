
# API Tugas Skripsi Amirul 

## Installation

```bash
  npm install
```
set .env
```bash
  cp .env.example .env
```
start server
```bash
  npm run dev
```
## Environment Variables
PORT=3000
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_HOST=localhost
DB_DIALECT=mariadb


## API Reference

#### Get average in 24 hours

```http
  GET /api/iot/average
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `start`      | `string` | **Required**. Date yyyy-mm-dd |


#### Get average in 24 hours

```http
  GET /api/iot/average/hour
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `start`      | `string` | **Required**. Date yyyy-mm-dd |


#### Get average in 1 day

```http
  GET /api/iot/average/day
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `start`      | `string` | **Required**. Date yyyy-mm-dd |
| `end`      | `string` | **Required**. Date yyyy-mm-dd |
