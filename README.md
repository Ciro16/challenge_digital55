# Digital55 Challenge

The purpose of this project is to create an end-to-end web application that allows the user to read, create and update a to-do list of duties of any kind.

## Starting 🚀

These instructions will allow you to get a working copy of the project on your local machine for development and testing purposes.

## Installation 🔧

- You must have Docker, Docker Compose and Node installed. <img src="icons/warning.png" alt="drawing" style="width:24px;"/>
- Clone the repository on your local disk. ⬇️
- Got to ```/frontend``` folder and exec ```npm install```
- Got to ```/backend``` folder and exec ```npm install```
- Open a terminal at the root of the project and run ```docker compose up```. 
  - This will raise the Frontend, Backend and Database containers.

- Now prove it!

### Test
- To run the tests, execute ```npm run test```

### Frontend

- Go to http://localhost:8000

### Backend
  - Base URL: http://localhost:3000
  - Below is the list of available endpoints:

### List all Duties

**URL**: `/api/v1/duties`  
**Method**: `GET`  
**Description**: List all duties.

**Request Parameters**:
none

**Request Example**:

```http
GET /api/v1/duties HTTP/1.1
```

### Create a Duty

**URL**: `/api/v1/duties`  
**Method**: `POST`  
**Description**: Creates a new duty.

**Request Parameters**:

| Parameter | Type   | Required | Description                           |
|-----------|--------|----------|---------------------------------------|
| name      | string | Yes      | The name of the duty                  |

**Request Example**:

```http
POST /api/v1/duties HTTP/1.1
Content-Type: application/json
{
  "name": "Buy milk",
}
```

### Update a Duty

**URL**: `/api/v1/duties/:id`  
**Method**: `PUT`  
**Description**: Update a duty.

**Request Parameters**:

| Parameter | Type   | Required | Description                           |
|-----------|--------|----------|---------------------------------------|
| name      | string | Yes      | The new name of the duty                  |

**Request Example**:

```http
PUT /api/v1/duties/3 HTTP/1.1
Content-Type: application/json
{
  "name": "Buy milk",
}
```

## Built with 🛠

- ReactJS <img src="icons/react.ico" alt="drawing" style="width:16px;position:relative;top:3px"/>
- Ant Design
- Node
- PostgreSQL
- Jest

## License 📄

This project is under License (MIT)
