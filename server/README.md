# Node.js API boilerplate

Piece of my thoughts about Node.js architecture.

## Highlights:

- Modular RESTful API
- ES10 (ECMAScript 2019)
- Service based
- NoSQL based (MongoDB)
- Auth (JWT/Access-token/Refresh-token)
- Cookie support
- Role based access control
- Request validation
- CRUD(users, posts resources)
- Automated API documentation
- Full authentication/authorization and user registration flow implemented
- Tests(e2e)

## Key points:

### 0. Monolith first

Its about monolith first approach. But this does not prevent you from using it in a microservice architecture as well.

### 1. Controller layer

Each entity have own controller function. It's a slim layer representing resource mapping(routing)

### 2. Service layer

It's a function encapsulated request validation, permission verification and business logic. One file, one function, one REST operation, one use case.

### 3. DAO layer

Implement data access methods.

### 4. Model layer

Represent models schemas and validation rules. There is no other logic **only model fields and validation rules**.

## Development:

### Install global dependencies:

```
npm install
```

### Go ahead...

```
cd /server
```

- `cp .env.example .env`
- Set required credential in `.env`

Run server

```
npm run start // prod mode
npm run dev // dev mode
```

### Implemented endpoints:

#### /auth

| Path                      | Method | Description                 | Access        |
| ------------------------- | ------ | --------------------------- | ------------- |
| /auth/signup              | POST   | SignUp                      | Public route  |
| /auth/login               | POST   | LogIn                       | Public route  |
| /auth/logout              | GET    | LogOut                      | Private route |
| /auth/refresh             | GET    | Refresh Tokens & User       | Private route |
| /auth/verify/:verifyToken | GET    | Activation Link             | Public route  |
| /auth/verify/             | POST   | Resend Activation           | Public route  |
| /auth/reset/:resetToken   | GET    | Reset password              | Public route  |
| /auth/reset               | POST   | Send 'reset password email' | Public route  |

#### /users

| Path                               | Method | Description                  | Access        |
| ---------------------------------- | ------ | ---------------------------- | ------------- |
| /users                             | GET    | List Users                   | Admin         |
| /users/:id                         | GET    | Get User By Id               | Admin         |
| /users/subscription                | PATCH  | Update CurrUser Subscription | Authenticated |
| /users/avatars                     | PATCH  | Update CurrUser Avatar       | Authenticated |
| /users/:id                         | PATCH  | Update User By Id            | Admin         |
| /users/                            | DELETE | Remove CurrUser              | Authenticated |
| /users/avatars                     | DELETE | Remove CurrUser Avatar       | Authenticated |
| /users/:id                         | DELETE | Remove User By Id            | Admin         |
| /users/password                    | POST   | Change Password              | Authenticated |
| \*/users/send-reset-password-email | POST   | SendResetPasswordEmail       | Authenticated |
| \*/users/reset-password            | POST   | Reset Password               | Authenticated |
| \*/users/change-email              | POST   | Change Email                 | Authenticated |
| \*/users/cancel-email-changing     | POST   | Cancel Email Changing        | Authenticated |

#### /contacts

| Path                   | Method | Description            | Access        |
| ---------------------- | ------ | ---------------------- | ------------- |
| /contacts              | GET    | List Contacts          | Private route |
| /contacts/:id          | GET    | Get Contact By Id      | Private route |
| /contacts              | POST   | Create Contact         | Private route |
| /contacts/:id          | PUT    | Update Contact         | Private route |
| /contacts/:id/favorite | PATCH  | Update Status Favorite | Private route |
| /contacts/:id          | DELETE | Remove Contact         | Private route |
