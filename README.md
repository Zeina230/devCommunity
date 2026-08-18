
# DevCommunity

## Project Overview

DevCommunity is a web platform designed for developers to discover and interact with technical content and communities. Users can authenticate, create and read blogs, join communities, and manage their personal profiles.

The project was developed as a Next.js capstone project using MongoDB for data storage and NextAuth for authentication.

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* MongoDB Atlas
* Mongoose
* NextAuth
* Zod

## Features Implemented

### Authentication

* Sign in with Google
* Sign in with GitHub
* Protected profile page
* Automatic user authentication

### Blogs

* View available blogs
* Create new blogs
* Display recent blogs
* Store blog data in MongoDB

### Communities

* View communities
* View community details
* Join communities
* Leave communities
* Store community data in MongoDB

### Profile

* Display authenticated user's name, email, image, bio, and joined date
* Display blogs created by the user
* Display communities joined by the user
* Update profile information
* Validate profile updates using Zod

## Database

The project uses MongoDB Atlas with Mongoose to store and manage:

* Users
* Blogs
* Communities

## Environment Variables

Create a `.env.local` file in the root of the project and add the required environment variables.

```env
MONGODB_URI=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

**Do not commit ****`.env.local`**** or any secret values to GitHub.**

## How to Run Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project

```bash
cd devCommunity
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create the environment file

Create a file named `.env.local` in the project root and add the required environment variables.

### 5. Start the development server

```bash
npm run dev
```

### 6. Open the application

Open:

```text
http://localhost:3000
```

##

## Known Limitations

* The application requires valid Google and GitHub authentication credentials.
* The application requires a working MongoDB Atlas connection.
* Some features may depend on the availability of the external authentication providers and database connection.

## Author

DevCommunity Capstone Project
