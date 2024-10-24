# Projects-Portal API Documentation

## Authentication

### POST /login

- **Description**: Authenticate the user and generate a JWT token.
- **Request Body**: 
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Responses**:
  - `200 OK`: Login successful, JWT token set in a cookie.
  - `401 Unauthorized`: Invalid credentials.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: Server error.

### POST /logout

- **Description**: Log the user out by clearing the JWT cookie.
- **Responses**:
  - `200 OK`: Logout successful.

## Projects

### GET /projects

- **Description**: Retrieve a list of all projects.
- **Responses**:
  - `200 OK`: Returns an array of project objects.
  - `500 Internal Server Error`: Server error.

### GET /projects/:id

- **Description**: Retrieve a project by its ID.
- **Parameters**:
  - `id`: The project ID.
- **Responses**:
  - `200 OK`: Returns the project object.
  - `404 Not Found`: Project not found.
  - `500 Internal Server Error`: Server error.

### POST /projects

- **Description**: Create a new project. Requires authentication.
- **Headers**:
  - `Authorization`: Bearer token (JWT).
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "githublink": "string"
  }
  ```
- **File Upload**:
  - Multiple images can be uploaded for the project (Maximum:5).
- **Responses**:
  - `201 Created`: Project created.
  - `400 Bad Request`: Missing required fields.
  - `500 Internal Server Error`: Server error.

### PATCH /projects/:id

- **Description**: Update an existing project. Requires authentication.
- **Headers**:
  - `Authorization`: Bearer token (JWT).
- **Parameters**:
  - `id`: The project ID.
- **Request Body** (any combination of fields):
  ```json
  {
    "title": "string",
    "description": "string",
    "githublink": "string"
  }
  ```
- **File Upload**:
  - New images can replace existing ones.
- **Responses**:
  - `200 OK`: Project updated.
  - `404 Not Found`: Project not found.
  - `500 Internal Server Error`: Server error.

### DELETE /projects/:id

- **Description**: Delete a project by its ID. Requires authentication.
- **Headers**:
  - `Authorization`: Bearer token (JWT).
- **Parameters**:
  - `id`: The project ID.
- **Responses**:
  - `200 OK`: Project deleted.
  - `404 Not Found`: Project not found.
  - `500 Internal Server Error`: Server error.

---

