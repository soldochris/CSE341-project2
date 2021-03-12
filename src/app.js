const express = require('express');
const path = require('path');
require('dotenv').config();
const { Pool } = require('pg');

//initializations
const app = express();


//settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

//middlewares

//routers
app.use(require('./routes/entries.routes'));

//404 handler
app.use((req, res)=>{
  res.status(404).render('404');
});

//starting the app
app.listen(app.get('port'), ()=>{
  console.log('Server on port: ', app.get('port'));
});