const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool.query('select * from users where user_id = $1', [id], (err, result) => {	
    done(err, result.rows);
  });
});

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done)=>{
  pool.query('SELECT * FROM users WHERE user_email  = $1', [email], (err,result) => {
    if(err){
      return done(err);
    }
    if (!result.rows.length){
      return done(null, false, req.flash('loginMessage', 'No user found.'));
    }
    if (!(bcrypt.compareSync(password , result.rows[0].user_pass))){
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
    }
    const user = {id: result.rows[0].user_id, name: result.rows[0].user_name, email: result.rows[0].user_email};
    return done(null, user);
  });
}));