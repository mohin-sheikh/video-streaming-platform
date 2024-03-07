# Video Streaming Platform

This is a simple Video Streaming Platform developed using Node.js, Express.js, and TypeScript. The project includes user authentication with JWT, CRUD operations for videos, and user management.

## Getting Started

Follow the instructions below to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:mohin-sheikh/video-streaming-platform.git
    ```

2. Navigate to the project directory:

    ```bash
    cd video-streaming-platform
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add the following:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/video_streaming_db
    JWT_SECRET_KEY=your_secret_key
    ```

    Replace `your_secret_key` with a secure secret key for JWT.

### Run the Application

Start the application with the following command:

```bash
npm start
```

The server will run at `http://localhost:3000`.

## API Endpoints

### User Authentication

- **POST /users/register**: Register a new user.

  Example Request:

  ```bash
  curl -X POST http://localhost:3000/users/register -H "Content-Type: application/json" -d '{"username": "TestUser", "email": "testuser@example.com", "password": "password"}'
  ```

- **POST /users/login**: Log in with an existing user.

  Example Request:

  ```bash
  curl -X POST http://localhost:3000/users/login -H "Content-Type: application/json" -d '{"email": "testuser@example.com", "password": "password"}'
  ```

- **GET /users/profile**: Get user profile (protected route, requires authentication).

  Example Request:

  ```bash
  curl http://localhost:3000/users/profile -H "x-auth-token: YOUR_JWT_TOKEN_HERE"
  ```

- **GET /users**: Get all users.

  Example Request:

  ```bash
  curl http://localhost:3000/users
  ```

- **GET /users/:id**: Get user by ID.

  Example Request:

  ```bash
  curl http://localhost:3000/users/USER_ID
  ```

- **PUT /users/:id**: Update user by ID.

  Example Request:

  ```bash
  curl -X PUT http://localhost:3000/users/USER_ID -H "Content-Type: application/json" -d '{"username": "UpdatedUser", "email": "updateduser@example.com"}'
  ```

- **DELETE /users/:id**: Delete user by ID.

  Example Request:

  ```bash
  curl -X DELETE http://localhost:3000/users/USER_ID
  ```

### Videos

- **GET /videos**: Get all videos.

  Example Request:

  ```bash
  curl http://localhost:3000/videos
  ```

- **GET /videos/:id**: Get video by ID.

  Example Request:

  ```bash
  curl http://localhost:3000/videos/VIDEO_ID
  ```

- **POST /videos**: Create a new video.

  Example Request:

  ```bash
  curl -X POST http://localhost:3000/videos -H "Content-Type: application/json" -d '{"title": "Sample Video", "url": "http://example.com/sample.mp4"}'
  ```

- **PUT /videos/:id**: Update video by ID.

  Example Request:

  ```bash
  curl -X PUT http://localhost:3000/videos/VIDEO_ID -H "Content-Type: application/json" -d '{"title": "Updated Video Title", "url": "http://example.com/updated.mp4"}'
  ```

- **DELETE /videos/:id**: Delete video by ID.

  Example Request:

  ```bash
  curl -X DELETE http://localhost:3000/videos/VIDEO_ID
  ```

## License

This project is licensed under the [MIT License](LICENSE).

```