# Clone Video Streaming API Documentation

Welcome to the documentation for the Clone Video Streaming API, providing you with details about the available endpoints and functionalities.

## Postman Collection

- [Collection](/contrib/Clone%20Video%20Streaming.postman_collection.json)
- [Envouirment Variable](/contrib/VIDEO%20STREAMING%20DEV.postman_environment.json)

## Table of Contents

- [Authentication](#authentication)
- [User Endpoints](#user-endpoints)
  - [Register User](#1-register-user)
  - [Login User](#2-login-user)
- [Movie Endpoints](#movie-endpoints)
  - [Add Movie](#1-add-movie)
  - [Upload Movie](#2-upload-movie)
  - [Fetch Movie](#3-fetch-movie)

## Authentication

To access the API endpoints, authentication using JWT (JSON Web Token) is required. Include the authentication token in the header of your requests.

### Authentication Endpoint

**URL:** `http://localhost:3000/api/v01/sessions`

**Method:** `POST`

**Request Body:**

```json
{
    "email": "{{email}}",
    "password": "{{password}}"
}
```

**Response:**

```json
{
    "accessToken": "{{x-access-token}}",
    "refreshToken": "{{x-refresh-token}}"
}
```

## User Endpoints

### 1. Register User

**URL:** `http://localhost:3000/api/v01/users`

**Method:** `POST`

**Request Body:**

```json
{
    "name": "TestUser",
    "email": "testuser@example.com",
    "password": "password"
}
```

**Success Response:**

```json
{
    "user": {
        "name": "TestUser",
        "email": "testuser@example.com",
        "userId": "user_zalvp8nxlv"
    }
}
```

**Error Response:**

```json
{
    "message": "Email already in use",
    "status": 409,
    "additionalInfo": {}
}
```

### 2. Login User

**URL:** `http://localhost:3000/api/v01/sessions`

**Method:** `POST`

**Request Body:**

```json
{
    "email": "{{email}}",
    "password": "{{password}}"
}
```

**Success Response:**

```json
{
    "accessToken": "{{x-access-token}}",
    "refreshToken": "{{x-refresh-token}}"
}
```

## Movie Endpoints

### 1. Add Movie

**URL:** `http://localhost:3000/api/v01/movie`

**Method:** `POST`

**Request Headers:**

- Authorization: `{{x-access-token}}`

**Request Body:**

```json
{
    "title": "Inception",
    "releaseDate": "2022-03-08",
    "genre": ["Action", "Adventure", "Sci-Fi"],
    "type": "Movie",
    "director": "Christopher Nolan",
    "runtime": "148 min",
    "released": "2010-07-16",
    "rated": "PG-13",
    "year": "2010",
    "quality": "1080p",
    "writer": "Christopher Nolan",
    "actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
    "plot": "A thief who enters the dreams of others to steal their secrets.",
    "language": "English",
    "country": "USA",
    "awards": "4 Oscars, 9 nominations",
    "poster": "https://example.com/inception_poster.jpg"
}
```

**Success Response:**

```json
{
    "movie": {
        // Detailed movie information, including ratings, image URLs, and other metadata
    }
}
```

**Error Response - Not Found Movie:**

```json
{
    "message": "movie not found",
    "status": 404,
    "additionalInfo": {}
}
```

**Error Response - Field Required:**

```json
{
    "message": "At least one image file is required.",
    "status": 400,
    "additionalInfo": {}
}
```

### 2. Upload Movie

**URL:** `http://localhost:3000/api/v01/movie/upload`

**Method:** `POST`

**Request Headers:**

- Authorization: `{{x-access-token}}`

**Request Body:**

- **images:** Image files (type: file)
- **movie:** Video file (type: file)
- **movieId:** `movieId` value (type: text)

**Success Response:**

```json
{
    "movie": {
        // Detailed movie information, similar to the success response of "Add Movie"
    }
}
```

**Error Response - Not Found Movie:**

```json
{
    "message": "movie not found",
    "status": 404,
    "additionalInfo": {}
}
```

**Error Response - Field Required:**

```json
{
    "message": "At least one image file is required.",
    "status": 400,
    "additionalInfo": {}
}
```

### 3. Fetch Movie

**URL:** `http://localhost:3000/api/v01/movie/:movieId`

**Method:** `GET`

**Success Response:**

```json
{
    "movie": {
        // Detailed movie information, similar to the success response of "Add Movie"
    }
}
```

**Error Response - Not Found Movie:**

```json
{
    "message": "movie not found",
    "status": 404,
    "additionalInfo": {}
}
```

## Additional Information

- **X-Powered-By:** Express
- **Content-Type:** application/json; charset=utf-8
- **Content-Length:** Varies
- **ETag:** Varies
- **Date:** Timestamp
- **Connection:** keep-alive
- **Keep-Alive:** timeout=5
