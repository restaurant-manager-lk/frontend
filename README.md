# Docker-Based Full-Stack Application (Frontennd)

This is a Docker-based full-stack application that includes a frontend and a backend connected to a MongoDB database..

## Prerequisites

- Docker installed on your machine

## Build and Run

### Frontend

1. Navigate to the frontend directory.
2. Build the frontend image:

```bash
docker build -t frontend .
```

3. Run the frontend container:
```bash
docker run -d -p 3000:3000 frontend
```
