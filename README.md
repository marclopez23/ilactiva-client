# Illactiva

<br>

## M3 Final Project

<br>

## Description

It is an app that will allow neighbors and local businesses to create events. The intention is to create these activities within the neighborhoods to improve the disconnection that currently exists in big cities and to promote local commerce.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up to the app so that I can start creating my own events or join them.
- **Login:** As a user I can login to the app so that I can manage my own events or join them.
- **Logout:** As a user I can logout from the app so no one else can use it
- **View Events** As a user I want to see a list of my events and also a view of each event individually
- **Create Event** As a user I can add a event
- **Edit event** As a user I can edit a event
- **Delete event** As a user I can delete a event
- **Join event** As a user I can join to an event.
- **Unsubscribe event** As a user I can unsubscribe from an event
- **Follow commerce** As a user I can follow a commerce
- **Unollow commerce** As a user I can unfollow a commerce
- **View User profile** As a user I can see my profile
- **Edit User profile** As a user I can edit my profile
- **Commerce profile** As a user I want to see the commerces profiles
- **My Activities** As a user I want to see my joined and created events
- **My folowe commerces** As a user I want to see my followed commerces

## Backlog

- Show event stats
- Send emails with notifications
- Geolocalize events by neighborhood
- Light/Dark mode

<br>

# Client / Frontend

## React Router Routes (React App)

| Path               | Component       | Permissions                | Behavior                                                         |
| ------------------ | --------------- | -------------------------- | ---------------------------------------------------------------- |
| `/`                | Home / HomePrivate       | public / user  `<Route>` / `<PrivateRoute>`      | Home page / Landing Page           |
| `/registrarme`          | SignUp    | anon only `<AnonRoute>`    | Signup form, link to login, navigate to Home Private  after signup   |
| `/iniciar-sesion`           | Login    | anon only `<AnonRoute>`    | Login form, link to signup, navigate to Home Private after login    |
| `/eventos`       | Events   | user only `<PrivateRoute>` | Page where the user can select to see the events joined or created                             |
| `/crear-evento`      | CreateEvent   | user only `<PrivateRoute>` | New event form, adds a new event and redirects to event connfirmation |
| `/evento/editar/:id` | EditEvent   | user only `<PrivateRoute>` | Edit the event info                                            |
| `/evento/creado` | EventConfirmation   | user only `<PrivateRoute>` | Screen to confirm to the user that the event is created              |
| `/evento/:id`      | Event | user only `<PrivateRoute>` | Page with the details of a event where the user can join                                 |
| `/eventos/:query/`      | UserEvents | user only `<PrivateRoute>` | Page with a list of user joined or created events                               |
| `/eventos/:query/:cuando`| MoreEvents | user only `<PrivateRoute>` | Page with a list of user joined or created events but filter for next or past events   |
| `/perfil`         | Profile   | user only `<PrivateRoute>` | Shows the user profile                        |
| `/perfil/editar/:id` | EditProfile   | user only `<PrivateRoute>` | Page where the user can edit the profile info                      |
| `/comercios/:id`    | CommercePage     | user only `<PrivateRoute>` | Shows the commerce profile, an their events                      |
| `/comercios/seguidos`    | FollowedCommerces     | user only `<PrivateRoute>` | Shows the commerces followed by the user                     |
| `/buscar`    | Search    | user only `<PrivateRoute>` | Page where the user can search events by category                    |
| `/eventos-:filtro`    | EventsList    | user only `<PrivateRoute>` | Page where the user can search events by a filter                   |
| `*`    | ErrorPage   | publlic | 404 or ErrorBoundary Page                 |

## Components

- Home

- HomePrivate
  - EventCard
  - EventCardLarge
  - Header
  - CommerceCard

- Login
  - LoginForm

- Signup
  - SimpleHeader
  - SignUpForm
    - CategorySelector
    - ConfirmationForm
    - FormFooter
  - SignUpCommerce
    - Tag
    - ConfirmationForm
    - FormFooter

- Events
  - Header

- CreateEvent
 - EventForm
   - FormFooter

- EditEvent
 - SimpleHeader

- EventConfirmation 

- Event

- UserEvents
  - SimpleHeader
  - EventCardLarge

- MoreEvents
  - SimpleHeader
  - EventCardLarge

- Profile
  - ProfileHeader
  - Tag
  - ListButton
  
- EditProfile
  - Tag
  - CategorySelector
  - Loader
  - SimpleHeader

- CommercePage
  - ProfileHeader
  - Tag
  - EventCardLarge
 
- FollowedCommerces
  - CommerceCard
  - SimpleHeader

- Search
  - CategorySelector
  - EventCardLarge
  - Tag

- EventsList
  - SimpleHeader
  - EventCardLarge

- ErrorPage

- Routes
  - AnonRoute
  - PrivateRoute

- Common
  - Navbar
  - Footer
  - Button
  - Menu
  - Loader
  - Footer
  - ErrorBoundary
  - ScrollToTop

## Services

- Auth Service
  - authApi.login(user)
  - authApi.signup(user)
  - authApi.logout()

- Events Service
  - eventsApi.getEvents()
  - eventsApi.createEvent(info)
  - eventsApi.getEvent(id)
  - eventsApi.editEvent(id, info)
  - eventsApi.deletEevent(eventId)
  - eventsApi.joinEvent(eventId) -> This also works for unsubscribe for an event

- User Service
  - usersApi.get()
  - usersApi.edit(id, info)
  - userApi.followCommerce(commerceId) -> This also works for unfollow commerces

- Commerces Service
  - commerceApi.getCommerces()
  - commerceApi.getCommerce(id)

- Upload Image Service
  - projectApi.uploadFileService(file)

<br>

## Contexts

- AuthContext
  - user
  - handleLogin()
  - handleLogout()
  - handleSignup()
  - setUser()

- EventContext
  - events
  - bringEvent(id)
  - newEvent(id)
  - setEvents()
  - registerEvent(id)
  - quitEvent(id)
  - eventEdit(id, info)

# Server / Backend

## Models

User model

```javascript
{
  name: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  direction: {type: String, required: true},
  category: {type: String, required: true, enum:["talleres", "deporte", "exposiciones", "Visitas y tours", "infatil", "quedadas", "cine", "espectáculos", "charlas", "música", "otros"] },
  profileImg: {type: String },
  eventsJoined: [ { type: mongoose.Schema.Types.ObjectId, ref: "Event" } ],
  eventsCreated: [ { type: mongoose.Schema.Types.ObjectId, ref: "Event" } ]
}
```

Commerce model

```javascript
{
  name: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  direction: {type: String, required: true},
  category: {type: String, enum:["restauración", "cultura", "moda", "asociación", "deporte", "salud", "electrónica", "otros", "comida"], required: true },
  tags: {type: Array, required: true },
  schedule: {type: String, required: true},
  profileImg: {type: String },
  eventsCreated: [ { type: mongoose.Schema.Types.ObjectId, ref: "Envent" } ]
}
```

Event model

```javascript
{
  creator: [ { type: mongoose.Schema.Types.ObjectId, refPath: "onModel" } ],
  onModel: {
    type: String,
    required: true,
    enum: ['User', 'Commerce']
  },
  title: {type: String, required: true },
  description: {type: String, required: true },
  eventImg: { type: String },
  category: {type: String, required: true, enum:["talleres", "deporte", "exposiciones", "Visitas y tours", "infatil", "quedadas", "cine", "espectáculos", "charlas", "música", "otros"] },
  free: {type: boolean, required: true},
  likes: {type: Number },
  price: {type: Number},
  location: {type: String, required: true },
  date: {type: Date, required: true },
  resgisteredUsers: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ],
},
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body          | Success status | Error Status | Description                                                                                                                     |
| ----------- | --------------------------- | --------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| POST        | `/auth/signup`              | {email, password ...} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`               | {email, password}     | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`              | (empty)               | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/api/events`               |                       |                | 400          | Sends all events                                                                                                                |
| GET         | `/api/events/:eventId`      | {id}                  |                |              | Sends one specific event                                                                                                        |
| POST        | `/api/events`               | {title, description}  | 201            | 400          | Create and saves a new event in the DB                                                                                          |
| PUT         | `/api/events/:eventId`      | {title, description}  | 200            | 400          | Edits event in the DB                                                                                                           |
| DELETE      | `/api/events/:eventId`      | {id}                  | 201            | 400          | Deletes event                                                                                                                   |
| GET         | `/api/user`                 | {}                    | 201            | 400          | Sends user detauls                                                                                                              |
| PUT         | `/api/user/:userId`         | {username ...}        |                |              | Edits user                                                                                                                      |
| GET         | `/api/commerce`             | {}                    | 201            | 400          | Sends commerce detauls                                                                                                          |
| PUT         | `/api/commerce/:commerceId` | {name ...}            |                |              | Edits commerce                                                                                                                  |

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/pEiiw1N0)

### Figma Proto

[Link to prototype](https://www.figma.com/proto/5j8DYsYFr4BfVLwJUxnCHh/Proyecto-illactiva?node-id=832%3A4066&viewport=-148%2C173%2C0.07832704484462738&scaling=scale-down)

### API Repo

[Link to the repo](https://github.com/marclopez23/illactiva-api)

