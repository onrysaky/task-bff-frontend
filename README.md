
```md
# Task BFF Frontend

Frontend React untuk aplikasi Task Management dengan autentikasi JWT dan Admin Panel.

##Tech Stack
- React.js
- React Router DOM
- Axios
- JWT (localStorage)

##Features
- Login & Register
- Protected Routes
- Task Management
  - Add task
  - Update status
  - Delete task
- Admin Panel
  - List users
  - Update user role
  - Delete user
- Auto logout jika token invalid

##Role Access
- **User** → Dashboard & Task
- **Admin** → Dashboard + Admin User Management

##Run Locally
```bash
npm install
npm start
