# Steps to setup project locally

## For Back-End ( in backend )

- Copy .env.example file to .env file and update the values

- Update the values in wrangler.toml file

- Run `npm install` to install all the dependencies

- Run `npm run dev` to start the development server in your localhost

### Backend hosted on [Cloudflare Workers] (https://backend.rashmik2705.workers.dev)

## For Front-End ( in frontend )

- Copy .env.example file to .env file and update the values

- Run `npm install` to install all the dependencies

- Run `npm run dev` to start the development server in your localhost

### Frontend hosted on [Vercel] (https://nexus-project-02.vercel.app/)

# Project description 

This project is a basic authentication system for a restaurant website where users can sign up, login and logout. Authentication is done using JWTs. The backend is hosted on Cloudflare Workers and the frontend is hosted on Vercel. Zod is used for validation for both frontend and backend. The frontend is made responsive for all screen sizes using Tailwind CSS. Password is hashed using bcryptJs.

## Stack

- Frontend : React, Tailwind CSS , Zod

- Backend : Cloudflare Workers, Wrangler, Zod , Typescript
