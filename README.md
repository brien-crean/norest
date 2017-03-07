# noReST simple CRUD

- Skeleton Node CRUD created with Express and MongoDB
- Implementation for GET/POST/PUT/DELETE actions for a simple logging API

- `npm run dev` to start server with nodemon
- nodemon will watch for any file changes

## Purpose:
- To act as a dummy API for front end web and mobile apps in test
- Springboard for other Node APIs I will use in future projects

## Note:
`db.url` in Server.js is expecting a URL to your Mongo database, which is excluded for obvious reasons in this repo

e.g.
`/config/db.js`
```
module.exports = {
  url : 'mongodb://<user>:<password>@<mongourl>'
};
```
