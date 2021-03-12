const { Pool } = require('pg');
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


module.exports = {
  renderIndex, getAllUsers, getUser, getUserFavs
}