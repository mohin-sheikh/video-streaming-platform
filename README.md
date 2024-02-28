# Video Streaming Platform

This is a simple video streaming platform built with Node.js, Express.js, and MongoDB.

## Table of Contents

- [Clone](#clone)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Clone

To clone this repository, run the following command in your terminal:

```bash
git clone git@github.com:mohin-sheikh/video-streaming-platform.git
```

## Installation

1. Install Node.js: [https://nodejs.org/](https://nodejs.org/)
2. Install MongoDB: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
3. Install project dependencies:

```bash
cd video-streaming-platform
npm install
```

## Configuration

1. Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/video_streaming_db
```

2. Make sure MongoDB is running.

## Usage

### Development

Run the server in development mode with nodemon:

```bash
npm run dev
```

### Production

Build the TypeScript files and start the server:

```bash
npm start
```

## API Endpoints

### Videos

- **GET /videos**: Get all videos.
- **GET /videos/:id**: Get a specific video by ID.
- **POST /videos**: Create a new video.
  - Request Body:

    ```json
    {
      "title": "Sample Video",
      "url": "http://example.com/sample.mp4"
    }
    ```

- **PUT /videos/:id**: Update a video by ID.
  - Request Body:

    ```json
    {
      "title": "Updated Video Title",
      "url": "http://example.com/updated.mp4"
    }
    ```

- **DELETE /videos/:id**: Delete a video by ID.

### Users

- **GET /users**: Get all users.
- **GET /users/:id**: Get a specific user by ID.
- **POST /users**: Create a new user.
  - Request Body:

    ```json
    {
      "username": "SampleUser",
      "email": "sampleuser@example.com"
    }
    ```

- **PUT /users/:id**: Update a user by ID.
  - Request Body:

    ```json
    {
      "username": "UpdatedUser",
      "email": "updateduser@example.com"
    }
    ```

- **DELETE /users/:id**: Delete a user by ID.

## Testing

Use the provided Postman collection for testing the API. Import the collection from the [Postman JSON file](contrib/postman-collection.json).

## Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.
