# Backend File Connectivity and Data Flow

This document describes how the backend files connect, from application startup through a user registration request and its response.

## 1. Files and their responsibilities

| File | Responsibility |
|---|---|
| `package.json` | Lists the backend dependencies and identifies `server.js` as the package entry point. |
| `.env` | Holds runtime configuration such as the MongoDB URI, JWT secret, and optional port. Keep its values private. |
| `server.js` | Imports the Express app, creates an HTTP server, and starts listening on the configured port (or `3000`). |
| `app.js` | Loads environment variables, configures Express middleware, starts the database connection, registers routes, and defines `GET /`. |
| `db/db.js` | Connects Mongoose to MongoDB using `MONGO_URI`. |
| `routes/userRoutes.js` | Defines user API paths and request validation. |
| `controllers/userController.js` | Coordinates validation, password hashing, user creation, token generation, and the HTTP response. |
| `services/userServices.js` | Checks required user fields and asks the user model to create the database record. |
| `models/userModel.js` | Defines the Mongoose user schema and the password-hashing, password-comparison, and JWT methods. |
| `.gitignore` | Prevents `.env` and `node_modules` from being included in Git. |

## 2. Startup connectivity

```text
package.json
    │ dependencies + entry point
    ▼
server.js
    │ require('./app')
    ▼
app.js
    ├── dotenv.config() ───────────────► .env configuration
    ├── connectDB() ───────────────────► db/db.js ──► MongoDB
    ├── cors() and express.json() ─────► request middleware
    ├── /api/users ────────────────────► routes/userRoutes.js
    └── GET / ─────────────────────────► "Hello world"
```

In order:

1. `package.json` declares the libraries used by the backend and names `server.js` as the main entry file.
2. `server.js` imports `app.js`, creates an HTTP server from the Express app, and listens on `process.env.PORT` or port `3000`.
3. `app.js` calls `dotenv.config()` so environment settings are available through `process.env`.
4. `app.js` calls `connectDB()`. `db/db.js` reads `process.env.MONGO_URI` and invokes `mongoose.connect(...)`.
5. `app.js` installs CORS and JSON parsing middleware. It then mounts the user router at `/api/users`.
6. `server.js` starts listening. The app can now receive HTTP requests.

**Connection timing:** `connectDB()` starts the Mongoose connection, but `app.js` does not await it. Therefore, the HTTP server can start listening before MongoDB has finished connecting.

## 3. User registration: request-to-database-to-response

The registration endpoint is `POST /api/users/register`.

```text
Client
  │ POST /api/users/register
  │ JSON: firstname, lastname, password, email
  ▼
app.js
  │ CORS middleware → JSON body parser
  ▼
routes/userRoutes.js
  │ email, password-length, firstname-length validation
  ▼
controllers/userController.js
  ├── invalid input ─────────────────────────────► 400 + validation errors
  │
  ├── userModel.hashedPassword(password)
  │       ▼
  │   models/userModel.js ──► bcrypt hash
  │
  └── userService.createUser(user fields + hash)
          ▼
      services/userServices.js
          │ required-field check
          ▼
      userModel.create(...)
          ▼
      models/userModel.js ──► Mongoose ──► MongoDB
          │ created user returned
          ▼
      controllers/userController.js
          │ user.generateAuthToken()
          ▼
      models/userModel.js ──► JWT signed with JWT_SECRET
          │
          ▼
      Client ◄── 201 JSON: { token, user }
```

### Step-by-step data passing

1. **The client sends the request.** The JSON body contains `firstname`, `lastname`, `password`, and `email`.
2. **Express prepares the request.** `app.js` runs the request through CORS and `express.json()`. The parsed JSON is available as `req.body`.
3. **The router validates the fields.** `routes/userRoutes.js` attaches validators to `POST /register`:
   - `email` must be a valid email address.
   - `password` must be at least 6 characters.
   - `firstname` must be at least 3 characters.
4. **The controller handles validation.** `controllers/userController.js` calls `validationResult(req)`. If validation errors exist, it stops and returns HTTP `400` with `{ errors: [...] }`.
5. **The controller hashes the password.** For valid input, it reads the four values from `req.body` and calls `userModel.hashedPassword(password)`. `models/userModel.js` uses bcrypt with a cost factor of `10` and returns the hash.
6. **The controller passes data to the service.** It calls `userService.createUser(...)`, passing the original name and email fields plus the hashed password.
7. **The service checks required values.** `services/userServices.js` verifies `firstname`, `lastname`, `password`, and `email` are present. It then calls `userModel.create(...)`.
8. **The model persists the user.** Mongoose applies the schema in `models/userModel.js` and writes the record to MongoDB. The created user is returned through the service to the controller.
9. **The controller creates a token.** It calls `user.generateAuthToken()`. The method in `models/userModel.js` signs a JWT containing the user's ID with `process.env.JWT_SECRET`.
10. **The server responds.** The controller returns HTTP `201` with JSON shaped like `{ "token": "...", "user": { ... } }`.

## 4. Model and database relationship

```text
controllers/userController.js
      │ calls static hashedPassword()
      │ calls instance generateAuthToken()
      ▼
models/userModel.js
      │ Mongoose schema + model methods
      │ userModel.create(...)
      ▼
MongoDB connection managed by db/db.js
```

The user schema defines `firstname`, `lastname`, `password`, `email`, and `socketId`. It marks `firstname`, `password`, and `email` as required; `firstname` and `email` are unique. The password field has `select: false`, so it is excluded from query results unless explicitly selected. The model also provides:

- `hashedPassword(password)` — hashes a password with bcrypt.
- `comparePassword(password)` — compares a candidate password against the stored hash.
- `generateAuthToken()` — signs a JWT containing the user's ID.

## 5. Other route

The root endpoint is independent of registration:

```text
Client ── GET / ──► app.js ──► "Hello world"
```

## 6. Important boundaries

- The route validates three fields, while the service additionally requires `lastname`.
- The service checks that values exist; schema constraints are also enforced by Mongoose when creating the user.
- The database connection is initiated during app setup, but the server does not wait for it to complete before listening.
- Configuration values belong in `.env`; do not copy credentials or secrets into documentation or source control.
