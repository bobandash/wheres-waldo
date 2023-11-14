# FINDUS
## Description:
A full-stack implementation of the classic game Where's Waldo with different images (classic Where's Waldo, Super Smash Bros, and Pokemon).

## Preview:
![where's waldo](https://github.com/bobandash/wheres-waldo/assets/74850332/58c92b34-0f63-4731-85f6-373bec77023a)
![where's waldo 2](https://github.com/bobandash/wheres-waldo/assets/74850332/02a00702-0459-4d41-8c2b-b2cc0fa6fd3e)

## Live View:
- Game: https://whereiswaldos.netlify.app/

## Technologies Used:
Front-End:
- React + Typescript
Backend:
- Express, Node.js
- MongoDB

## Quick Start
- Fork the project
- Clone the project using git clone https://github.com/bobandash/wheres-waldo.git
- Open the project using the editor of your choice
- Run npm install
- Create a database on mongoDB
- Make sure that you're current directory is on the server
- Create an .env file with your database URL (include password) with MONGODB_URL as the key
- Run "node populateDb.js" to populate the database
- Run npm run devStart to compile the server
- Make another terminal with the directory on the client and run "npm run dev"


## Concepts Learned
- More practice on common React hooks (first time using useRef and useContext)
- More practice on Backend CRUD operations 

## To-Do:
If I were to come back to this project in the future, I would want to:
- Refactor my react code to use custom hooks instead of storing them in one file
- Use useCallback when drilling down functions as props
- Filter out the pixel coordinates from front end, so that the user shouldn't be able to intercept the location of the waldos
