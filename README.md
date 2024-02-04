# Recipe Backend and Frontend

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Documentation](#api-documentation)

## Introduction

Contains the backend part of the Recipe ChatBot Application. It uses jwt authentication to authenticate a user basis the login and signup.
User can generate recipe along with image of the recipe and also he/she can mark the recipe as favourite or unfavourite.
We are using openai for the Generative AI part
Models Used:
Completions Api => Text Generation => gpt-4
Image Generation => Image Generation => dall-e-3

Sample Video Link of Whole Journey: [Loom Video Link](https://www.loom.com/share/2da33abb33cb434cb057ce4164b254c3?sid=09fa5966-4cf7-424d-a017-42abc18c7fde).

## Prerequisites

- Node.js (v14.x or later)
- npm or yarn
- MongoDb setup on local or mongo cloud

## Installation

- ** Clone the repository**: (Due to some environment variables currently i have kept the repository as private)

```bash
   git clone https://github.com/devrajj/Recipe.git
```

- **Open Two Terminal Windows:**
  **On the first window:**
  cd /pathWhereYouHaveClonedRepo/frontend
  **On the second window:**
  cd /pathWhereYouHaveClonedRepo/backend

- CREATE a .env file in backend and frontend folder. Below are the keys that needs to be added in .env

- **.env of backend**

```bash
PORT=3001 //contains the port on which your server should run change or keep 3001
OPENAI_API_KEY=paste_your_open_api_key_here //contains openai apikey
MONGO_URL=mongodb+srv://username:password@cluster0.i45cv6t.mongodb.net/recipes //mongourl where data needs to be persisted
JWT_SECRET_KEY=32digit key //generate a 32 digit unique key using command openssl rand -hex 16 command in your terminal
```

- **.env of frontend**

```bash
REACT_APP_CHATBOT_API_URL=http://localhost:3001/  //contains ip and port of your backend server to connect
```

- On Frontend window run npm i if you have cloned for the first time else ignore this step. This will install the dependencies used in frontend.
- On Backend window run npm i if you have cloned for the first time else ignore this step. This will install the dependencies used in backend.
- Once npm i is installed run nodemon or node src/server.js on backend window
- Once npm i is installed run npm run start on frontend window
- You will be redirected to the url (localhost:3000 as of now) where you can see the UI

## API Documentation

To explore and understand the API endpoints and functionality, refer to the [Postman API Documentation](https://documenter.getpostman.com/view/20988862/2s9YywdJTk#22a12bb8-a8fb-4734-b2ca-c7a0d41daeef).

**Accessing Postman Documentation:**

- Visit the provided [Postman Documentation URL](https://documenter.getpostman.com/view/20988862/2s9YywdJTk#22a12bb8-a8fb-4734-b2ca-c7a0d41daeef).
- Explore endpoints, request methods, parameters, and response examples.

For hitting postman apis Go on Environments -> Globals and add two keys OPEN_AI_KEY, JWT_TOKEN. The initial and current value will be your
openaikey and jwt token.
