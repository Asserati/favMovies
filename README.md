# React + Nest + Tmdb API
Glad that you made it here :)

To start the project:

- open the directory ./favMovies-main
  
- run "npm install"
  
After that, we have to set up our database.

The database is ready for postgres use.

edit these in app.module.ts (favMovies-main/apps/api/src)

{

 port: 5432,
 
 username: 'postgres',
 
 password: 'betmonas',
 
 database: 'moviedb',
 
}

There will be two servers running, one for client another for api.

- go to /favMovies-main/apps/client and also in the terminal run "npm run dev"
- 
- go to /favMovies-main/apps/api and in the terminal write "npm run dev"
