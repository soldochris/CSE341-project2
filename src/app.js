const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash')
require('dotenv').config();
require('./passport/local-auth');

//initializations
const app = express();

//settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

//public
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res, next)=>{
  app.locals.loginMessage = req.flash('loginMessage');
  app.locals.user = req.user;
  next();
});

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