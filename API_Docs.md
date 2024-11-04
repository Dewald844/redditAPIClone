Sure, here is the documentation for each API call in Markdown syntax:

# API Documentation

## User API

### Create User
- **URL**: `/user/create`
- **Method**: `POST`
- **Headers**: None
- **Body**:
  ```json
  {
      "name": "string",
      "email": "string",
      "password": "string"
  }
  ```
- **Response**:
  ```json
  {
      "user_id": "integer",
      "name": "string",
      "email": "string"
  }
  ```

### User Login
- **URL**: `/user/login`
- **Method**: `POST`
- **Headers**: None
- **Body**:
  ```json
  {
      "email": "string",
      "password": "string"
  }
  ```
- **Response**:
  ```json
  {
      "token": "string"
  }
  ```

## Post API

### Create Post
- **URL**: `/post/create`
- **Method**: `POST`
- **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
      "title": "string",
      "content": "string"
  }
  ```
- **Response**:
  ```json
  {
      "post_id": "integer",
      "title": "string",
      "content": "string",
      "user_id": "integer"
  }
  ```

### Upvote Post
- **URL**: `/post/upvote`
- **Method**: `POST`
- **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
      "post_id": "integer"
  }
  ```
- **Response**:
  ```json
  {
      "post_id": "integer",
      "upvotes": "integer[]"
  }
  ```

### Downvote Post
- **URL**: `/post/downvote`
- **Method**: `POST`
- **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
      "post_id": "integer"
  }
  ```
- **Response**:
  ```json
  {
      "post_id": "integer",
      "downvotes": "integer[]"
  }
  ```

### Read All Posts by User
- **URL**: `/post/read`
- **Method**: `GET`
- **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
- **Body**: None
- **Response**:
  ```json
  [
      {
          "post_id": "integer",
          "title": "string",
          "content": "string",
          "user_id": "integer"
      }
  ]
  ```

### Read All Posts by User Email
- **URL**: `/post/read/email`
- **Method**: `GET`
- **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
      "email": "string"
  }
  ```
- **Response**:
  ```json
  [
      {
          "post_id": "integer",
          "title": "string",
          "content": "string",
          "user_id": "integer"
      }
  ]
  ```

### Delete Post
- **URL**: `/post/delete`
- **Method**: `DELETE`
- **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
      "post_id": "integer"
  }
  ```
- **Response**:
  ```json
  {
      "message": "string"
  }
  ```

### Update Post Title
- **URL**: `/post/update/title`
- **Method**: `POST`
- **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
      "post_id": "integer",
      "new_title": "string"
  }
  ```
- **Response**:
  ```json
  {
      "post_id": "integer",
      "title": "string"
  }
  ```

### Update Post Content
- **URL**: `/post/update/content`
- **Method**: `POST`
- **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
      "post_id": "integer",
      "new_content": "string"
  }
  ```
- **Response**:
  ```json
  {
      "post_id": "integer",
      "content": "string"
  }
  ```

## Comment API

### Create Comment
- **URL**: `/comment/create`
- **Method**: `POST`
- **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
      "post_id": "integer",
      "content": "string"
  }
  ```
- **Response**:
  ```json
  {
      "comment_id": "integer",
      "post_id": "integer",
      "user_id": "integer",
      "content": "string"
  }
  ```

### Read Comments by Post
- **URL**: `/comment/read`
- **Method**: `GET`
- **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
      "post_id": "integer"
  }
  ```
- **Response**:
  ```json
  [
      {
          "comment_id": "integer",
          "post_id": "integer",
          "user_id": "integer",
          "content": "string"
      }
  ]
  ```

### Upvote Comment
- **URL**: `/comment/upvote`
- **Method**: `POST`
- **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
      "comment_id": "integer"
  }
  ```
- **Response**:
  ```json
  {
      "comment_id": "integer",
      "upvotes": "integer[]"
  }
  ```

### Downvote Comment
- **URL**: `/comment/downvote`
- **Method**: `POST`
- **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
      "comment_id": "integer"
  }
  ```
- **Response**:
  ```json
  {
      "comment_id": "integer",
      "downvotes": "integer[]"
  }
  ```

### Delete Comment
- **URL**: `/comment/delete`
- **Method**: `DELETE`
- **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
      "comment_id": "integer"
  }
  ```
- **Response**:
  ```json
  {
      "message": "string"
  }
  ```

### Update Comment Content
- **URL**: `/comment/update`
- **Method**: `POST`
- **Headers**:
    - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
      "comment_id": "integer",
      "content": "string"
  }
  ```
- **Response**:
  ```json
  {
      "comment_id": "integer",
      "content": "string"
  }
  ```