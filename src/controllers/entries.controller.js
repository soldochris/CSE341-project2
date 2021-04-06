const { Pool } = require('pg');
const bcrypt = require('bcrypt');


const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

const getAllUsers = (req, res)=>{
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query("SELECT * FROM users", (err, response) => {
      done();
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
        res.setHeader("Content-Type", "application/json");
        res.send(response.rows);
      }
    })
  })
};

const getUser = (req, res)=>{
  const id = req.params.id;

  pool.connect((err, client, done) => {
    if (err) throw err
    client.query('SELECT * FROM users WHERE user_id = $1', [id], (err, response) => {
      done()
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
        res.setHeader("Content-Type", "application/json");
        res.send(response.rows);
      }
    })
  })
};

const getUserFavs = (req, res)=>{
  const id = req.params.id;

  pool.connect((err, client, done) => {
    if (err) throw err
    client.query('SELECT * FROM favs WHERE user_id = $1', [id], (err, response) => {
      done()
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
        res.setHeader("Content-Type", "application/json");
        res.send(response.rows);
      }
    })
  })
};

const renderIndex = (req, res) =>{
  res.render('index');
};

const renderMyAccount = (req, res) =>{
  res.render('createAccount');
};

const createAccount = async (req, res) =>{
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hash = bcrypt.hashSync(password, 10);

  const text = 'INSERT INTO users(user_name, user_email, user_pass) VALUES ($1, $2,$3)';
  const values = [name,email, hash];
  const response = await pool.query(text,values);
  res.redirect('/signIn');
};

const renderProfile =(req, res) =>{
  res.render('myFavs');
};

const renderSignIn = (req, res) =>{
  res.render('signIn');
};

const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
};

const addFav = async(req, res) => {
  const idFav = req.params.idFav;
  const idUser = req.params.idUser;

  const text = 'INSERT INTO favs(char_id, user_id) VALUES ($1, $2)';
  const values = [idFav, idUser];
  const response = await pool.query(text,values);
  res.redirect('/profile');
}


const delFav = async(req, res) => {
  const idFav = req.params.idFav;

  const text = 'DELETE FROM favs WHERE fav_id = $1';
  const values = [idFav];
  const response = await pool.query(text,values);
  res.redirect('/profile');
}

module.exports = {
  renderIndex, getAllUsers, getUser, getUserFavs, renderMyAccount, createAccount, renderSignIn, renderProfile, logout, isAuthenticated, addFav, delFav
}
