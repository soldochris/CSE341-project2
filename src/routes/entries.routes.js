const {Router} = require('express');
const router = Router();
const {renderIndex, getAllUsers, getUser, getUserFavs} = require('../controllers/entries.controller');

router.get('/', renderIndex);
router.get('/api/users', getAllUsers);
router.get('/api/user/:id', getUser);
router.get('/api/userFavs/:id', getUserFavs);

module.exports = router;