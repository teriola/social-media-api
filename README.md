# Social Media API

This REST API is built with Express and provides endpoints for retrieving and managing user and post data.

## Getting started

To get started you'll need to clone the repository and install the dependencies:

```
git clone https://github.com/teriola/social-media-api.git
cd social-media-api
npm install
```

Then, you can start the server with the following command:

Production:
```
npm start
```

Development:
```
npm run dev
```

The server will run on port 3000 by default but you can add custom configurations in the .env file in the root directory.

## Endpoints

The API provides the following endpoints:

### Authentication

1. POST /auth/register

Registers a new user.

Request body:
```
{
    "name": "Mike",
    "surname": "Tyson",
    "email": "miketyson@gmail.com",
    "password": "123456",
    "rePassword": "123456"
}
```

Response body:
```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM5NDdlNDA4NzllMjcyN2U2ZDk0Y2IiLCJlbWFpbCI6Im1pa2V0eXNvbkBnbWFpbC5jb20iLCJpYXQiOjE2ODE0NzU1NTd9.Mw9nxQ_MzZXuzRMxSCN_1jRKFwgKE83vKWzv_LdzqQI"
}
```

2. POST /auth/login

Logs in an already registered user

Request body:
```
{
    "email": "miketyson@gmail.com",
    "password": "123456",
}
```

Response body:
```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM5NDdlNDA4NzllMjcyN2U2ZDk0Y2IiLCJlbWFpbCI6Im1pa2V0eXNvbkBnbWFpbC5jb20iLCJpYXQiOjE2ODE0NzU1NTd9.Mw9nxQ_MzZXuzRMxSCN_1jRKFwgKE83vKWzv_LdzqQI"
}
```

### Users

1. GET /users/me

Gets the currently logged in user by accessToken

Response body:
```
{
    "_id": "643947e40879e2727e6d94cb",
    "name": "Mike",
    "surname": "Tyson",
    "email": "miketyson@gmail.com",
    "description": "",
    "profilePicture": "https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png",
    "coverPicture": "https://img.rawpixel.com/private/static/images/website/2022-05/rm422-076-x.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=444e119094ef45a3248aa529fb696b2b"
}
```

2. GET /users/:id

Gets a single user by id

Response body:
```
{
    "_id": "643947e40879e2727e6d94cb",
    "name": "Mike",
    "surname": "Tyson",
    "email": "miketyson@gmail.com",
    "description": "",
    "profilePicture": "https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png",
    "coverPicture": "https://img.rawpixel.com/private/static/images/website/2022-05/rm422-076-x.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=444e119094ef45a3248aa529fb696b2b"
}
```

3. GET /users/:id/followers

Gets a single user's followers

Response body:
```
[
    {
        "_id": "64394b980879e2727e6d94d7",
        "name": "Elon",
        "surname": "Musk",
        "profilePicture": "https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png"
    }
]
```

4. POST /users/:id/follow

Follows a user

Response body:
```
{
    "message": "Followed user"
}
```
