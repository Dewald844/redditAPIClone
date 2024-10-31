# Reddit API Clone
### Minimal reddit api clone (Backend only)

## Installation & setup
1. Clone the repository
2. Run `npm install`
3. Run `node app.js`
4. Server will be running on `http://localhost:3000`

## Code structure
```mermaid
graph TD
    DATABASE["Database"]
    DOMAIN["Domain"]
    HELPERS["Helpers"]
    INTERFACE["Interface"]
    API["API"]
    
    DOMAIN --> DATABASE
    DOMAIN --> HELPERS
    INTERFACE --> DOMAIN
    API --> INTERFACE
```

## API Endpoints

### User
 - POST /user/login/email/{email}/password/{password}
 - POST /user/create/name/{name}/email/{email}/password/{password}

### Post
 - POST /post/create/title/{title}/content/{title}/user/{userId}
 - POST /post/upvote/post/{postId}/user/{userId}
 - POST /post/downvote/post/{postId}/user/{userId}
 - GET /post/read/user/{userId}
 - DELETE /post/delete/post/{postId}/user/{userId}
 - POST /post/update/title/{title}/post/{postId}/user/{userId}
 - POST /post/update/content/{content}/post/{postId}/user/{userId}

### Comment
 - POST /comment/create/post/{postId}/user/{userId}/content/{content}
 - GET /comment/read/post/{postId}